/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module objectmappers {
    
    import IQService = angular.IQService;
    import DomainObject = domainobjects.DomainObject;
    
    export class ObjectMapperFactory {
        
        static injectAs: string = 'objectMapperFactory';
        
        constructor(private $q: IQService) {
        }
        
        public create<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject>(domainObjectConstructor: () => DOMAIN_OBJECT_TYPE): ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {
            return new ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>(this.$q, domainObjectConstructor);
        }
        
    }
    
}