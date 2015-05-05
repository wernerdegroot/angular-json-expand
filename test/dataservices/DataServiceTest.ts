/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/dataservices/DataService.ts" />
/// <reference path="../../test/dataservices/MyDomainObject.ts" />

module dataservices {
	
	import IQService = angular.IQService;
	import IPromise = angular.IPromise;
	import IRootScopeService = angular.IRootScopeService;
	
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
		var singleUrl: string;
		var allUrl: string;
		var errorUrl: string;
		var resourceLocation;
		var resourceLocationWithError;
		var objectMapper;
		var id: number = 42;
		
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
			firstJsonResponsePromise = q.when({data: firstJson});
			secondJson = createMockObject('f9f5b3799488');
			allJsonResponsePromise = q.when({data: [firstJson, secondJson]});
			errorResponsePromise = q.reject();
			
			// Some URL's.
			singleUrl = '/api/some-resource/42';
			allUrl = '/api/some-resource';
			errorUrl = '/api/some-resource/non-existing-id';
			
			// Mock $http-service.
			http = {
				get: sinon.stub()	
			};
			http.get.withArgs(singleUrl).returns(firstJsonResponsePromise);
			http.get.withArgs(allUrl).returns(allJsonResponsePromise);
			http.get.withArgs(errorUrl).returns(errorResponsePromise);
			
			// Mock a ResourceLocation.
			resourceLocation = {
                getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()
            };
			resourceLocation.getSingleUrl.withArgs(id).returns(singleUrl);
			resourceLocation.getAllUrl.returns(allUrl);
			
			// Mock a ResourceLocation that returns an URL at which an error will be generated.
			resourceLocationWithError = {
				getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()	
			};
			resourceLocationWithError.getAllUrl.returns(errorUrl);
			resourceLocationWithError.getSingleUrl.returns(errorUrl);
			
			// Mock an ObjectMapper.
			objectMapper = {
				fromJson: sinon.stub()	
			};
		}));
		
		afterEach(() => {
            rootScope.$digest();
        });
		
		it('should return a promise to a JSON-object when getById is called', () => {
			
			objectMapper.fromJson.withArgs(firstJson).returns(firstDomainObjectPromise);
			
			// Construct a DataService.
			var dataService: DataService<number, MyDomainObject> = new DataService<number, MyDomainObject>(http, q);
			
			// Obtain a response through the DataService.
			// Make sure that the response matches our expectations.
			var responsePromise = dataService.getById(id, resourceLocation, <any> objectMapper);
			responsePromise.then((domainObject: Object) => {
				expect(domainObject).to.equal(firstDomainObject);
			});
		});
		
		it('should return a rejected promise when getById is called but the server returns an error', () => {
			
			// Construct a DataService.
			var dataService: DataService<number, MyDomainObject> = new DataService<number, MyDomainObject>(http, q);
			
			// Obtain a response through the DataService.
			var responsePromise = dataService.getById(id, resourceLocationWithError, <any> objectMapper);
			console.log(responsePromise);
			responsePromise.then(function () {
				// Fail the test when te promise is succesfully resolved.
				expect(true).to.be.false; 
			});
		});
		
		it('should return a promise to a JSON-object when getAll is called', () => {
			
			objectMapper.fromJson.withArgs(firstJson).returns(firstDomainObjectPromise);
			objectMapper.fromJson.withArgs(secondJson).returns(secondDomainObjectPromise);
			
			// Construct a DataService.
			var dataService: DataService<number, MyDomainObject> = new DataService<number, MyDomainObject>(http, q);
			
			// Obtain a response through the DataService.
			// Make sure that the response matches our expectations.
			var responsePromise = dataService.getAll(resourceLocation, <any> objectMapper);
			responsePromise.then((domainObjects: Object[]) => {
				expect(domainObjects[0]).to.equal(firstDomainObject);
				expect(domainObjects[1]).to.equal(secondDomainObject);
			});
		});
		
		it('should return a rejected promise when getAll is called but the server returns an error', () => {
			
			// Construct a DataService.
			var dataService: DataService<number, MyDomainObject> = new DataService<number, MyDomainObject>(http, q);
			
			// Obtain a response through the DataService.
			var responsePromise = dataService.getAll(resourceLocationWithError, <any> objectMapper);
			
			responsePromise.then(function () {
				// Fail the test when te promise is succesfully resolved.
				expect(true).to.be.false; 
			});
		});
				
	});
	
}