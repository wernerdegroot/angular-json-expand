/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/converters/IdConverter.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IRootScopeService = angular.IRootScopeService;
    import Repository = repositories.Repository;
    import DomainObject = domainobjects.DomainObject;

    describe('IdConverter', () => {

        // Mock a DomainObject.
        var domainObject = {
            id: 14
        };

        var repository;
        var q: IQService;
        var rootScope: IRootScopeService;
        var resourceLocation;

        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;
            
            // Mock a ResourceLocation.
            resourceLocation = {
                guid: 'f6483c0ee475' 
            };
            
            // Mock a Repository.
            repository = {
                getById: sinon.stub()
            };
            repository.getById.withArgs(domainObject.id, resourceLocation).returns(domainObject);
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transform an id to a promise to a DomainObject by using a Repository', () => {

            var idConverter = new IdConverter<number, DomainObject<number>>(q, repository, resourceLocation);

            var domainObjectPromise: IPromise<DomainObject<number>> = idConverter.from(domainObject.id);
            domainObjectPromise.then((domainObject: DomainObject<number>) => {
                expect(domainObject).to.equal(domainObject);
                expect(repository.getById.calledWith(domainObject.id, resourceLocation)).to.be.ok;
            });
        });

        it('should transform a promise to an id to a promise to a DomainObject by using a Repository', () => {

            var idConverter = new IdConverter<number, DomainObject<number>>(q, repository, resourceLocation);

            var domainObjectPromise = idConverter.from(q.when(domainObject.id));
            domainObjectPromise.then((domainObject: DomainObject<number>) => {
                expect(domainObject).to.equal(domainObject);
                expect(repository.getById.calledWith(domainObject.id, resourceLocation)).to.be.ok;
            });
        });

        it('should transform a DomainObject to a promise to an id by using DomainObject\'s id', () => {

            var idConverter = new IdConverter<number, DomainObject<number>>(q, repository, resourceLocation);

            var idPromise: IPromise<number> = idConverter.to(domainObject);
            idPromise.then((id: number) => {
                expect(id).to.equal(domainObject.id);
            });
        });

        it('should transform a promise to a DomainObject to a promise to an id by using DomainObject\'s id', () => {

            var idConverter = new IdConverter<number, DomainObject<number>>(q, repository, resourceLocation);

            var idPromise: IPromise<number> = idConverter.to(q.when(domainObject));
            idPromise.then((id: number) => {
                expect(id).to.equal(domainObject.id);
            });
        });
    });
}
