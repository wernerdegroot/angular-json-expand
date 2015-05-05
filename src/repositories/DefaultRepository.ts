/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/resourcelocations/ResourceLocation.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/dataservices/DataService.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import DomainObject = domainobjects.DomainObject;
    import ResourceLocation = resourcelocations.ResourceLocation;
    import ObjectMapper = objectmappers.ObjectMapper;
    import DataService = dataservices.DataService;

    export class DefaultRepository<ID_TYPE, DOMAIN_OBJECT_TYPE extends DomainObject<any>> implements Repository<ID_TYPE, DOMAIN_OBJECT_TYPE> {

        constructor(private dataService: DataService<ID_TYPE, DOMAIN_OBJECT_TYPE>) {
        }

        getById(id: ID_TYPE, resourceLocation: ResourceLocation<ID_TYPE>): IPromise<DOMAIN_OBJECT_TYPE> {
            return this.dataService.getById(id, resourceLocation, this.getObjectMapper());
        }
        
        getAll(resourceLocation: ResourceLocation<ID_TYPE>): IPromise<DOMAIN_OBJECT_TYPE[]> {
            return this.dataService.getAll(resourceLocation, this.getObjectMapper());
        }
        
        getObjectMapper(): ObjectMapper<DOMAIN_OBJECT_TYPE> {
            throw new Error('Method getObjectMapper not implemented!');
        }

    }
}
