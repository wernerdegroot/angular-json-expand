/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/templates/Template.ts" />

module templates {
    
    import IQService = angular.IQService;
    
    export class TemplateFactory {
        
        constructor(private $q: IQService) {
        }
        
        public create<T>(subjectConstructor: () => T): Template<T> {
            return new Template<T>(this.$q, subjectConstructor);
        }
        
    }
    
}