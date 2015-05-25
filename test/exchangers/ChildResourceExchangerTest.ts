/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/ChildResourceExchanger.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IRootScopeService = angular.IRootScopeService;
    import Repository = repositories.Repository;
    import MockDomainObject = domainobjects.MockDomainObject;
    import DomainObject = domainobjects.DomainObject;

    describe('ChildResourceExchanger', () => {

        var domainObjectPropertyName = "domainObjectProperty";
        var slug = 'slug';

        var q: IQService;
        var rootScope: IRootScopeService;
        var repository;
        var children = [{}, {}, {}];

        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;

            repository = {
                getSlug: sinon.stub(),
                getAll: sinon.stub()
            };            
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should use a repository to fetch all children and return a promise when the children are fetched', () => {
            
            var domainObject = new MockDomainObject();
            var parentDomainObject = new MockDomainObject();
            
            repository.getAll.withArgs(domainObject).returns(q.when(children));

            var childResourceExchanger = new ChildResourceExchanger(q, domainObjectPropertyName, repository);
            
            var childrenFetchedPromise: IPromise<any> = childResourceExchanger.fromJson({}, domainObject, slug, parentDomainObject);
            childrenFetchedPromise.then(() => {
                expect(domainObject[domainObjectPropertyName]).to.equal(children); 
            });
        });
        
        it('should use a repository to fetch all children and return a rejected promise when the children could not be fetched', () => {
            
            var domainObject = new MockDomainObject();
            var parentDomainObject = new MockDomainObject();
            
            repository.getAll.withArgs(domainObject).returns(q.reject());

            var childResourceExchanger = new ChildResourceExchanger(q, domainObjectPropertyName, repository);
            
            var childrenFetchedPromise: IPromise<any> = childResourceExchanger.fromJson({}, domainObject, slug, parentDomainObject);
            expect(childrenFetchedPromise).to.be.rejected;
        });
        
        it('should return a resolved promise (but do nothing) when toJson is called', () => {
			
			var domainObject = new MockDomainObject();
			
			var childResourceExchanger = new ChildResourceExchanger(q, domainObjectPropertyName, repository);
			
			expect(childResourceExchanger.toJson(domainObject, {})).to.not.be.rejected;
		});
    });
}
