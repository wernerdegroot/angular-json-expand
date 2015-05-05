/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />
/// <reference path="../../src/resourcelocations/ResourceLocation.ts" />
/// <reference path="../../src/templates/Template.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/dataservices/DataService.ts" />
/// <reference path="../../src/templates/Template.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import IdSubject = subjects.IdSubject;
    import ResourceLocation = resourcelocations.ResourceLocation;
    import Template = templates.Template;
    import DataService = dataservices.DataService;

    export class DefaultRepository<ID_TYPE, SUBJECT_TYPE extends IdSubject<any>> implements Repository<ID_TYPE, SUBJECT_TYPE> {

        constructor(private dataService: DataService<ID_TYPE, SUBJECT_TYPE>) {
        }

        getById(id: ID_TYPE, resourceLocation: ResourceLocation<ID_TYPE>): IPromise<SUBJECT_TYPE> {
            return this.dataService.getById(id, resourceLocation, this.getTemplate());
        }
        
        getAll(resourceLocation: ResourceLocation<ID_TYPE>): IPromise<SUBJECT_TYPE[]> {
            return this.dataService.getAll(resourceLocation, this.getTemplate());
        }
        
        getTemplate(): Template<SUBJECT_TYPE> {
            throw new Error('Method getTemplate not implemented!');
        }

    }
}
