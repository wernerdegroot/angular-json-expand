/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/resourcelocations/ResourceLocation.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import DomainObject = domainobjects.DomainObject;
    import ResourceLocation = resourcelocations.ResourceLocation;

    // A Repository allows one to manage (get, update, create, delete) domain objects.
    export interface Repository<ID_TYPE, DOMAIN_OBJECT_TYPE extends DomainObject<any>> {

        getById(id: ID_TYPE, resourceLocation: ResourceLocation<ID_TYPE>): IPromise<DOMAIN_OBJECT_TYPE>;
        
        getAll(resourceLocation: ResourceLocation<ID_TYPE>): IPromise<DOMAIN_OBJECT_TYPE[]>;

    }
}
