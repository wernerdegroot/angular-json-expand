/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/converters/IdConverter.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/domainobjects/RootObject.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IRootScopeService = angular.IRootScopeService;
    import Repository = repositories.Repository;
    import DomainObject = domainobjects.DomainObject;
    import RootObject = domainobjects.RootObject;

    describe('IdConverter', () => {

        // Mock a DomainObject.
        var domainObject = {
            getId: () => 14
        };

        var repository;
        var q: IQService;
        var rootScope: IRootScopeService;
        var rootObject;

        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;
            
            rootObject = new RootObject('http://localhost/api');
            
            // Mock a Repository.
            repository = {
                getById: sinon.stub()
            };
            repository.getById.withArgs(domainObject.getId(), rootObject).returns(domainObject);
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transform an id to a promise to a DomainObject by using a Repository', () => {

            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var domainObjectPromise: IPromise<DomainObject> = idConverter.from(domainObject.getId());
            expect(domainObjectPromise).to.eventually.equal(domainObject);
            
            rootScope.$digest();
            expect(repository.getById.calledWith(domainObject.getId(), rootObject)).to.be.ok;
        });

        it('should transform a promise to an id to a promise to a DomainObject by using a Repository', () => {

            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var domainObjectPromise = idConverter.from(q.when(domainObject.getId()));
            expect(domainObjectPromise).to.eventually.equal(domainObject);
            
            rootScope.$digest();
            expect(repository.getById.calledWith(domainObject.getId(), rootObject)).to.be.ok;
        });
        
        it('should transform a rejected promise to an id to a rejected promise to a DomainObject', () => {

            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var domainObjectPromise = idConverter.from(q.reject());
            expect(domainObjectPromise).to.be.rejected;
        });
        
        it('should transform null and undefined into a rejected promise when calling from', () => {
            
            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var domainObjectPromise = idConverter.from(null);
            expect(domainObjectPromise).to.be.rejected;
            
            domainObjectPromise = idConverter.from(undefined);
            expect(domainObjectPromise).to.be.rejected;
        });
        
        it('should transform a promise to null and a promise to undefined into a rejected promise when calling from', () => {
            
            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var domainObjectPromise = idConverter.from(q.when(null));
            expect(domainObjectPromise).to.be.rejected;
            
            domainObjectPromise = idConverter.from(q.when(undefined));
            expect(domainObjectPromise).to.be.rejected;
        });

        it('should transform a DomainObject to a promise to an id by using DomainObject\'s id', () => {

            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var idPromise: IPromise<number> = idConverter.to(domainObject);
            expect(idPromise).to.eventually.equal(domainObject.getId());
        });

        it('should transform a promise to a DomainObject to a promise to an id by using DomainObject\'s id', () => {

            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var idPromise: IPromise<number> = idConverter.to(q.when(domainObject));
            idPromise.then((id: number) => {
                expect(id).to.equal(domainObject.getId());
            });
        });
        
        it('should transform a rejected promise to a DomainObject to a rejected promise to an id', () => {

            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var idPromise: IPromise<number> = idConverter.to(q.reject());
            expect(idPromise).to.be.rejected;
        });
        
        it('should transform null and undefined into a rejected promise when calling to', () => {
            
            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var idPromise = idConverter.to(null);
            expect(idPromise).to.be.rejected;
            
            idPromise = idConverter.to(undefined);
            expect(idPromise).to.be.rejected;
        });
        
        it('should transform a promise to null and a promise to undefined into a rejected promise when calling to', () => {
            
            var idConverter = new IdConverter<DomainObject>(q, repository, rootObject);

            var idPromise = idConverter.to(q.when(null));
            expect(idPromise).to.be.rejected;
            
            idPromise = idConverter.to(q.when(undefined));
            expect(idPromise).to.be.rejected;
        });
    });
}
