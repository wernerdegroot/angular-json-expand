/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />

module objectmappers {
    
    import IQService = angular.IQService;
    
    export class ObjectMapperFactory {
        
        static injectAs: string = 'objectMapperFactory';
        
        constructor(private $q: IQService) {
        }
        
        public create<T>(domainObjectConstructor: () => T): ObjectMapper<T> {
            return new ObjectMapper<T>(this.$q, domainObjectConstructor);
        }
        
    }
    
}