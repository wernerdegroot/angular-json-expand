/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/repositories/DefaultRepository.ts" />

module repositories {
	
	import IHttpService = angular.IHttpService;
	import IHttpBackendService = angular.IHttpBackendService;
	
	describe('DefaultRepository',  () => {
		
		var http: IHttpService;
		var httpBackend: IHttpBackendService;
		
		beforeEach(inject(($httpBackend: IHttpBackendService, $http: IHttpService) => {
			http = $http;
			httpBackend = $httpBackend;
		}));
		
		it('should return a promise to a JSON-object when getById is called', () => {
			
			var id: number = 42;
			var url: string = '/api/some-resource/42';
			
			// Mock a Context.
			var context = {
                getSingleUrl: sinon.stub(),
				getAllUrl: sinon.stub()
            };
			context.getSingleUrl.withArgs(id).returns(url);
			
			// Mock a resource.
			var responseData = {
				payload: 'payload'	
			};
			httpBackend.when('GET', url).respond(responseData);
			
			// Construct a DefaultRepository.
			var defaultRepository = new DefaultRepository<number, any>(http);
			
			// Obtain a response through the DefaultRepository.
			// Make sure that the response matches our expectations.
			var responsePromise = defaultRepository.getById(id, context);
			responsePromise.then((response) => {
				expect(response.data).to.eql(responseData);
			});
			
			// Flush to resolve the promise and execute the expectations.
			httpBackend.flush();
			
		});
		
	});
	
}