/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/dataservices/DataService.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import DomainObject = domainobjects.DomainObject;
    import ObjectMapper = objectmappers.ObjectMapper;
    import DataService = dataservices.DataService;

    export class DefaultRepository<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> implements Repository<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {

        constructor(private dataService: DataService) {
        }

        getById(id: number|string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<DOMAIN_OBJECT_TYPE> {
            return this.dataService.getSingle(id, this.getSlug(), parentDomainObject, this.getObjectMapper());
        }
        
        getAll(parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<DOMAIN_OBJECT_TYPE[]> {
            return this.dataService.getCollection(this.getSlug(), parentDomainObject, this.getObjectMapper());
        }
        
        getObjectMapper(): ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {
            throw new Error('Method getObjectMapper not implemented!');
        }
        
        getSlug(): string {
            throw new Error('Method getSlug not implemented!');
        }

    }
}
