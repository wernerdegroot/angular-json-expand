/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import DomainObject = domainobjects.DomainObject;
    import ObjectMapper = objectmappers.ObjectMapper;

    // A Repository allows one to manage (get, update, create, delete) domain objects.
    export interface Repository<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> {

        getById(id: number|string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<DOMAIN_OBJECT_TYPE>;
        
        getAll(parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<DOMAIN_OBJECT_TYPE[]>;
        
        getObjectMapper(): ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>;
        
        getSlug(): string;
    }
}
