/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />
/// <reference path="../../src/resourcelocations/ResourceLocation.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import IdSubject = subjects.IdSubject;
    import ResourceLocation = resourcelocations.ResourceLocation;

    // A Repository allows one to manage (get, update, create, delete) domain objects.
    export interface Repository<ID_TYPE, SUBJECT_TYPE extends IdSubject<any>> {

        getById(id: ID_TYPE, resourceLocation: ResourceLocation<ID_TYPE>): IPromise<SUBJECT_TYPE>;
        
        getAll(resourceLocation: ResourceLocation<ID_TYPE>): IPromise<SUBJECT_TYPE[]>;

    }
}
