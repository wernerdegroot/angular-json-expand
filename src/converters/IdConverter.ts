/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/resourcelocations/ResourceLocation.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import DomainObject = domainobjects.DomainObject;
    import Repository = repositories.Repository;
    import ResourceLocation = resourcelocations.ResourceLocation;

    // Converts between an id (of type ID_TYPE) and a domain object with this id (which should extend
    // DomainObject<ID_TYPE>). It uses a Repository (with a corresponding ResourceLocation) to do so. 
    export class IdConverter<ID_TYPE, DOMAIN_OBJECT_TYPE extends DomainObject<any>> implements Converter<ID_TYPE, DOMAIN_OBJECT_TYPE> {

        constructor(
            private $q: IQService, 
            private repository: Repository<ID_TYPE, DOMAIN_OBJECT_TYPE>,
            private resourceLocation: ResourceLocation<ID_TYPE>) {
        }

        from(id: IPromise<ID_TYPE>|ID_TYPE): IPromise<DOMAIN_OBJECT_TYPE> {
            var idPromise: IPromise<ID_TYPE> = this.$q.when(id);
            return idPromise.then((id: ID_TYPE) => this.repository.getById(id, this.resourceLocation));
        }

        to(domainObject: IPromise<DOMAIN_OBJECT_TYPE>|DOMAIN_OBJECT_TYPE): IPromise<ID_TYPE> {
            var domainObjectPromise = this.$q.when(domainObject);
            return domainObjectPromise.then((domainObject: DOMAIN_OBJECT_TYPE) => domainObject.id)
        }
    }
}
