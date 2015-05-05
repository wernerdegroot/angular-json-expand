/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/dataservices/DataService.ts" />

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
		var someJson: Object;
		var anotherJson: Object;
		var someJsonResponsePromise: IPromise<Object>;
		var allJsonResponsePromise: IPromise<Object>;
		var errorResponsePromise: IPromise<Object>;
		var singleUrl: string;
		var allUrl: string;
		var errorUrl: string;
		var resourceLocation;
		var id: number = 42;
		
		beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
			q = $q;
			rootScope = $rootScope;
			
			// Mock domain objects.
			firstDomainObject = {
				guid: '0c8b736a1604'
			};
			firstDomainObjectPromise = q.when(firstDomainObject);
			
			secondDomainObject = {
				guid: '20442b443f9d'
			};
			secondDomainObjectPromise = q.when(secondDomainObject);
			
			// Mock JSON-objects.
			someJson = {
				guid: '7bf39e45713b'	
			};
			someJsonResponsePromise = q.when({data: someJson});
			
			anotherJson = {
				guid: 'f9f5b3799488'
			}
			allJsonResponsePromise = q.when({data: [someJson, anotherJson]});
			
			errorResponsePromise = q.reject();
			
			// Some URL's.
			singleUrl = '/api/some-resource/42';
			allUrl = '/api/some-resource';
			errorUrl = '/api/some-resource/non-existing-id';
			
			// Mock $http-service.
			http = {
				get: sinon.stub()	
			};
			http.get.withArgs(singleUrl).returns(someJsonResponsePromise);
			http.get.withArgs(allUrl).returns(allJsonResponsePromise);
			http.get.withArgs(errorUrl).returns(errorResponsePromise);
			
			// Mock a ResourceLocation.
			resourceLocation = {
                getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()
            };
			resourceLocation.getSingleUrl.withArgs(id).returns(singleUrl);
			resourceLocation.getAllUrl.returns(allUrl);
		}));
		
		afterEach(() => {
            rootScope.$digest();
        });
		
		it('should return a promise to a JSON-object when getById is called', () => {
			
			// Mock an ObjectMapper.
			var objectMapper = {
				fromJson: sinon.stub()	
			};
			objectMapper.fromJson.withArgs(someJson).returns(firstDomainObjectPromise);
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			// Make sure that the response matches our expectations.
			var responsePromise = dataService.getById(id, resourceLocation, <any> objectMapper);
			responsePromise.then((domainObject: Object) => {
				expect(domainObject).to.equal(firstDomainObject);
			});
		});
		
		it('should return a rejected promise when getById is called but the server returns an error', () => {
			
			// Mock a ResourceLocation that returns an URL at which an error will be generated.
			var resourceLocationWithError = {
				getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()	
			};
			resourceLocationWithError.getSingleUrl.returns(errorUrl);
			
			// Mock an ObjectMapper.
			var objectMapper = {
				fromJson: sinon.stub()	
			};
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			var responsePromise = dataService.getById(id, resourceLocationWithError, <any> objectMapper);
			
			var errorRaised: boolean = false;
			responsePromise.catch(() => {
				errorRaised = true;
			});
			
			expect(errorRaised).to.be.false;
			rootScope.$digest(); // Resolve promises.
			expect(errorRaised).to.be.true;
		});
		
		it('should return a promise to a JSON-object when getAll is called', () => {
			
			// Mock an ObjectMapper.
			var objectMapper = {
				fromJson: sinon.stub()	
			};
			objectMapper.fromJson.withArgs(someJson).returns(firstDomainObjectPromise);
			objectMapper.fromJson.withArgs(anotherJson).returns(secondDomainObjectPromise);
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			// Make sure that the response matches our expectations.
			var responsePromise = dataService.getAll(resourceLocation, <any> objectMapper);
			responsePromise.then((domainObjects: Object[]) => {
				expect(domainObjects[0]).to.equal(firstDomainObject);
				expect(domainObjects[1]).to.equal(secondDomainObject);
			});
		});
		
		it('should return a rejected promise when getAll is called but the server returns an error', () => {
			
			// Mock a ResourceLocation that returns an URL at which an error will be generated.
			var resourceLocationWithError = {
				getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()	
			};
			resourceLocationWithError.getAllUrl.returns(errorUrl);
			
			// Mock an ObjectMapper.
			var objectMapper = {
				fromJson: sinon.stub()	
			};
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			var responsePromise = dataService.getAll(resourceLocationWithError, <any> objectMapper);
			
			var errorRaised: boolean = false;
			responsePromise.catch(() => {
				errorRaised = true;
			});
			
			expect(errorRaised).to.be.false;
			rootScope.$digest(); // Resolve promises.
			expect(errorRaised).to.be.true;
		});
				
	});
	
}