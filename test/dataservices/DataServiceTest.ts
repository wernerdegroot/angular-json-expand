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
		var someSubject: Object;
		var anotherSubject: Object;
		var someSubjectPromise: IPromise<Object>;
		var anotherSubjectPromise: IPromise<Object>;
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
			
			// Mock subjects.
			someSubject = {
				guid: '0c8b736a1604'
			};
			someSubjectPromise = q.when(someSubject);
			
			anotherSubject = {
				guid: '20442b443f9d'
			};
			anotherSubjectPromise = q.when(anotherSubject);
			
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
			
			var someSubjectPromise: IPromise<Object> = q.when(someSubject);
			
			// Mock a Template.
			var template = {
				fromJson: sinon.stub()	
			};
			template.fromJson.withArgs(someJson).returns(someSubjectPromise);
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			// Make sure that the response matches our expectations.
			var responsePromise = dataService.getById(id, resourceLocation, <any> template);
			responsePromise.then((subject: Object) => {
				expect(subject).to.equal(someSubject);
			});
		});
		
		it('should return a rejected promise when getById is called but the server returns an error', () => {
			
			// Mock a ResourceLocation that returns an URL at which an error will be generated.
			var resourceLocationWithError = {
				getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()	
			};
			resourceLocationWithError.getSingleUrl.returns(errorUrl);
			
			// Mock a Template.
			var template = {
				fromJson: sinon.stub()	
			};
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			var responsePromise = dataService.getById(id, resourceLocationWithError, <any> template);
			
			var errorRaised: boolean = false;
			responsePromise.catch(() => {
				errorRaised = true;
			});
			
			expect(errorRaised).to.be.false;
			rootScope.$digest(); // Resolve promises.
			expect(errorRaised).to.be.true;
		});
		
		it('should return a promise to a JSON-object when getAll is called', () => {
			
			var someSubjectPromise: IPromise<Object> = q.when(someSubject);
			
			// Mock a Template.
			var template = {
				fromJson: sinon.stub()	
			};
			template.fromJson.withArgs(someJson).returns(someSubjectPromise);
			template.fromJson.withArgs(anotherJson).returns(anotherSubjectPromise);
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			// Make sure that the response matches our expectations.
			var responsePromise = dataService.getAll(resourceLocation, <any> template);
			responsePromise.then((subject: Object[]) => {
				expect(subject[0]).to.equal(someSubject);
				expect(subject[1]).to.equal(anotherSubject);
			});
		});
		
		it('should return a rejected promise when getAll is called but the server returns an error', () => {
			
			// Mock a ResourceLocation that returns an URL at which an error will be generated.
			var resourceLocationWithError = {
				getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()	
			};
			resourceLocationWithError.getAllUrl.returns(errorUrl);
			
			// Mock a Template.
			var template = {
				fromJson: sinon.stub()	
			};
			
			// Construct a DataService.
			var dataService: DataService<number, any> = new DataService<number, any>(http, q);
			
			// Obtain a response through the DataService.
			var responsePromise = dataService.getAll(resourceLocationWithError, <any> template);
			
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