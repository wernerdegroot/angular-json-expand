/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/dataservices/DataService.ts" />
/// <reference path="../../test/dataservices/MyDomainObject.ts" />
/// <reference path="../../test/dataservices/MockUrlBuilder.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />

module dataservices {
	
	import IQService = angular.IQService;
	import IPromise = angular.IPromise;
	import IRootScopeService = angular.IRootScopeService;
	import MockDomainObject = domainobjects.MockDomainObject;
	
	describe('DataService',  () => {
		
		var q: IQService;
		var rootScope: IRootScopeService;
		var http;
		var firstDomainObject: Object;
		var secondDomainObject: Object;
		var firstDomainObjectPromise: IPromise<Object>;
		var secondDomainObjectPromise: IPromise<Object>;
		var firstJson: Object;
		var secondJson: Object;
		var firstJsonResponsePromise: IPromise<Object>;
		var allJsonResponsePromise: IPromise<Object>;
		var errorResponsePromise: IPromise<Object>;
		var firstUrl: string;
		var secondUrl: string;
		var allUrl: string;
		var errorUrl: string;
		var objectMapper;
		var firstId: number = 42;
		var secondId: number = 43;
		var slug: string = 'slug';
		var errorSlug: string = 'error-slug';
		var urlBuilder;
		var parentDomainObject;
		
		var createMockObject = (guid: string) => {
			return {
				guid: guid
			};
		};
		
		beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
			q = $q;
			rootScope = $rootScope;
			
			// Mock domain objects.
			firstDomainObject = createMockObject('0c8b736a1604');
			firstDomainObjectPromise = q.when(firstDomainObject);
			secondDomainObject = createMockObject('20442b443f9d');
			secondDomainObjectPromise = q.when(secondDomainObject);
			
			// Mock responses.
			firstJson = createMockObject('7bf39e45713b');
			firstJson['id'] = firstId;
			firstJsonResponsePromise = q.when({data: firstJson});
			secondJson = createMockObject('f9f5b3799488');
			secondJson['id'] = secondId;
			allJsonResponsePromise = q.when({data: [firstJson, secondJson]});
			errorResponsePromise = q.reject();
			
			// Some URL's.
			firstUrl = '/api/some-resource/42';
			secondUrl = '/api/some-resource/43';
			allUrl = '/api/some-resource';
			errorUrl = '/api/some-resource/non-existing-id';
			
			// Mock $http-service.
			http = {
				get: sinon.stub()	
			};
			http.get.withArgs(firstUrl).returns(firstJsonResponsePromise);
			http.get.withArgs(allUrl).returns(allJsonResponsePromise);
			http.get.withArgs(errorUrl).returns(errorResponsePromise);
			
			// Mock an ObjectMapper.
			objectMapper = {
				fromJson: sinon.stub()	
			};
			
			// Mock a parent domain object.
			parentDomainObject = new MockDomainObject();
			
			// Mock an UrlBuilder.
			urlBuilder = new MockUrlBuilder();
			urlBuilder.buildSingleUrl.withArgs(firstId, slug, parentDomainObject).returns(firstUrl);
			urlBuilder.buildSingleUrl.withArgs(secondId, slug, parentDomainObject).returns(secondUrl);
			urlBuilder.buildCollectionUrl.withArgs(slug, parentDomainObject).returns(allUrl);
			urlBuilder.buildSingleUrl.withArgs(firstId, errorSlug, parentDomainObject).returns(errorUrl);
			urlBuilder.buildCollectionUrl.withArgs(errorSlug, parentDomainObject).returns(errorUrl);
		}));
		
		afterEach(() => {
            rootScope.$digest();
        });
		
		describe('getSingle', () => {
			
			it('should return a promise to a JSON-object', () => {
			
				objectMapper.fromJson.withArgs(firstJson).returns(firstDomainObjectPromise);
				
				var dataService: DataService = new DataService(http, q, urlBuilder);
				
				var responsePromise = dataService.getSingle(firstId, slug, parentDomainObject, <any> objectMapper);
				
				expect(responsePromise).to.not.be.rejected;
				expect(responsePromise).to.eventually.equal(firstDomainObject);
				responsePromise.then(() => {
					expect(objectMapper.fromJson.calledWith(firstJson, firstId, firstUrl, parentDomainObject)).to.be.ok;
				});
			});
			
			it('should return a rejected promise when the server returns a rejected promise', () => {
				
				var dataService: DataService = new DataService(http, q, urlBuilder);
				
				var responsePromise = dataService.getSingle(firstId, errorSlug, parentDomainObject, <any> objectMapper);
				
				expect(responsePromise).to.be.rejected;
			});
			
			it('should return a rejected promise when the ObjectMapper returns an rejected promise', () => {
				
				objectMapper.fromJson.withArgs(firstJson).returns(q.reject());
				
				var dataService: DataService = new DataService(http, q, urlBuilder);
				
				var responsePromise = dataService.getSingle(firstId, errorSlug, parentDomainObject, <any> objectMapper);
				
				expect(responsePromise).to.be.rejected;
			});
		});
		
		describe('getAll', () => {
			
			it('should return a promise to a JSON-object', () => {
			
				objectMapper.fromJson.withArgs(firstJson).returns(firstDomainObjectPromise);
				objectMapper.fromJson.withArgs(secondJson).returns(secondDomainObjectPromise);
				
				var dataService: DataService = new DataService(http, q, urlBuilder);
				
				// Obtain a response through the DataService.
				// Make sure that the response matches our expectations.
				var responsePromise = dataService.getCollection(slug, parentDomainObject, <any> objectMapper);
				responsePromise.then((domainObjects: Object[]) => {
					expect(domainObjects[0]).to.equal(firstDomainObject);
					expect(domainObjects[1]).to.equal(secondDomainObject);
					
					expect(objectMapper.fromJson.calledWith(firstJson, firstId, firstUrl, parentDomainObject)).to.be.ok;
					expect(objectMapper.fromJson.calledWith(secondJson, secondId, secondUrl, parentDomainObject)).to.be.ok;
				});
			});
			
			it('should return a rejected promise when the server returns a rejected promise', () => {
				
				var dataService: DataService = new DataService(http, q, urlBuilder);
				
				var responsePromise = dataService.getCollection(errorSlug, parentDomainObject, <any> objectMapper);
				expect(responsePromise).to.be.rejected;
			});
			
			it('should return a rejected promise when the ObjectMapper returns a rejected promise for one of the JSON objects', () => {
				
				objectMapper.fromJson.withArgs(firstJson).returns(firstDomainObjectPromise);
				objectMapper.fromJson.withArgs(secondJson).returns(q.reject());
				
				var dataService: DataService = new DataService(http, q, urlBuilder);
				
				var responsePromise = dataService.getCollection(errorSlug, parentDomainObject, <any> objectMapper);
				expect(responsePromise).to.be.rejected;
			});
		});				
	});
	
}