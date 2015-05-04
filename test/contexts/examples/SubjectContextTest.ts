/// <reference path="../../../test/test-dependencies.ts" />
/// <reference path="../../../test/contexts/examples/Root.ts" />
/// <reference path="../../../test/contexts/examples/RootContext.ts" />
/// <reference path="../../../test/contexts/examples/Category.ts" />
/// <reference path="../../../test/contexts/examples/CategoryContext.ts" />
/// <reference path="../../../test/contexts/examples/Subject.ts" />
/// <reference path="../../../test/contexts/examples/SubjectContext.ts" />
/// <reference path="../../../src/templates/TemplateFactory.ts" />
/// <reference path="../../../src/templates/Template.ts" />
/// <reference path="../../../src/exchangers/DefaultExchanger.ts" />
/// <reference path="../../../src/repositories/DefaultRepository.ts" />

module contexts.examples {
    
    import IQService = angular.IQService;
	import IPromise = angular.IPromise;
	import IRootScopeService = angular.IRootScopeService;
    import Template = templates.Template;
    import TemplateFactory = templates.TemplateFactory;
    import DefaultExchanger = exchangers.DefaultExchanger;
    import DefaultRepository = repositories.DefaultRepository;

    describe('SubjectContext', () => {
        
        var q: IQService;
		var rootScope: IRootScopeService;
		var http;
        var someJson: Object;
		var anotherJson: Object;
		var someJsonResponsePromise: IPromise<Object>;
		var allJsonResponsePromise: IPromise<Object>;
        var singleUrl: string = '/api/categories/second/subjects/4';
        var allUrl: string = '/api/categories/second/subjects';
        
        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
			q = $q;
			rootScope = $rootScope;
            
            // Mock JSON-objects.
			someJson = {
				jsonStringProperty: 'twelve',
                jsonNumberProperty: 12
			};
			someJsonResponsePromise = q.when({data: someJson});
			
			anotherJson = {
				jsonStringProperty: 'four',
                jsonNumberProperty: 4
			}
			allJsonResponsePromise = q.when({data: [someJson, anotherJson]});
            
            // Mock $http-service.
			http = {
				get: sinon.stub()	
			};
			http.get.withArgs(singleUrl).returns(someJsonResponsePromise);
			http.get.withArgs(allUrl).returns(allJsonResponsePromise);
        }));
        
        afterEach(() => {
            rootScope.$digest();
        });

        it('should return the correct url', () => {
            
            var templateFactory = new TemplateFactory(q);
            var template: Template<Object> = templateFactory.create(() => { return {}; })
                .add(new DefaultExchanger(q, 'jsonStringProperty', 'subjectStringProperty'))
                .add(new DefaultExchanger(q, 'jsonNumberProperty', 'subjectNumberProperty'));

            var root = new Root();
            var category = new Category();
            var subject = new Subject();
            
            var rootContext = new RootContext();
            var categoryContext = new CategoryContext(root, rootContext);
            var subjectContext = new SubjectContext(category, categoryContext);
            
            expect(subjectContext.getSingleUrl(subject.getId())).to.equal(singleUrl);
            expect(subjectContext.getAllUrl()).to.equal(allUrl);
            
            var defaultRepository: DefaultRepository<number, any> = new DefaultRepository(http, q);
            
            // Obtain a response through the DefaultRepository.
			// Make sure that the response matches our expectations.
			var responsePromise = defaultRepository.getById(subject.getId(), subjectContext, <any> template);
			responsePromise.then((subject: Object) => {
				expect(subject['subjectStringProperty']).to.equal('twelve');
                expect(subject['subjectNumberProperty']).to.equal(12);
			});
        });
    });
}
