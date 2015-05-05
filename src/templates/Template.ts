/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/CompositeExchanger.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/exchangers/DefaultExchanger.ts" />

module templates {
    
    import CompositeExchanger = exchangers.CompositeExchanger;
    import Exchanger = exchangers.Exchanger;
    import DefaultExchanger = exchangers.DefaultExchanger;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;
    
    export class Template<T> {
        
        private compositeExchanger: CompositeExchanger;

        constructor(private $q: IQService, private domainObjectConstructor: () => T) {
            this.compositeExchanger = new CompositeExchanger($q);
        }
        
        defaultExchanger(jsonPropertyName: string, domainObjectPropertyName: string): Template<T> {
            return this.add(new DefaultExchanger(this.$q, jsonPropertyName, domainObjectPropertyName));
        }
        
        add(exchanger: Exchanger): Template<T> {
            this.compositeExchanger.add(exchanger);
            return this;
        }

        fromJson(json: Object): IPromise<T> {
            var domainObject: T = this.domainObjectConstructor();
            return this.compositeExchanger.fromJson(json, domainObject).then(() => {
                return domainObject;
            });
        }

        toJson(domainObject: T): IPromise<any> {
            var json = {};
            return this.compositeExchanger.toJson(domainObject, json).then(() => {
                return json;
            });
        }
        
    }
    
}