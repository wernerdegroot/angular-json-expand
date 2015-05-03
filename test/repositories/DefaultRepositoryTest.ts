/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/repositories/DefaultRepository.ts" />

module repositories {
	
	import IHttpService = angular.IHttpService;
	import IHttpBackendService = angular.IHttpBackendService;
	import IQService = angular.IQService;
	import IPromise = angular.IPromise;
	
	describe('DefaultRepository',  () => {
		
		var http: IHttpService;
		var httpBackend: IHttpBackendService;
		var q: IQService;
		
		beforeEach(inject(($httpBackend: IHttpBackendService, $http: IHttpService, $q: IQService) => {
			http = $http;
			httpBackend = $httpBackend;
			q = $q;
		}));
		
		it('should return a promise to a JSON-object when getById is called', () => {
			
			var id: number = 42;
			var url: string = '/api/some-resource/42';
			
			// Mock a subject.
			var expectedSubject: Object = {
				guid: '0c8b736a1604'
			};
			var expectedSubjectPromise: IPromise<Object> = q.when(expectedSubject);
			
			// Mock a Context.
			var context = {
                getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()
            };
			context.getSingleUrl.withArgs(id).returns(url);
			
			// Mock a Template.
			var template = {
				fromJson: sinon.stub()	
			};
			template.fromJson.returns(expectedSubjectPromise);
			
			// Mock a resource.
			var responseData = {
				guid: '7bf39e45713b'	
			};
			httpBackend.when('GET', url).respond(responseData);
			
			// Construct a DefaultRepository.
			var defaultRepository = new DefaultRepository<number, any>(http);
			
			// Obtain a response through the DefaultRepository.
			// Make sure that the response matches our expectations.
			var responsePromise = defaultRepository.getById(id, context, <any> template);
			responsePromise.then((subject: Object) => {
				expect(subject).to.equal(expectedSubject);
				
				// The method fromJson of Template should be called with responseData.
				expect(template.fromJson.called).to.be.true;
				expect(template.fromJson.firstCall.args[0]).to.eql(responseData);
			});
			
			// Flush to resolve the promises and execute the expectations.
			httpBackend.flush();
			
		});
		
	});
	
}