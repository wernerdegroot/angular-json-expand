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

        constructor(private $q: IQService, private subjectConstructor: () => T) {
            this.compositeExchanger = new CompositeExchanger($q);
        }
        
        defaultExchanger(jsonPropertyName: string, subjectPropertyName: string): Template<T> {
            return this.add(new DefaultExchanger(this.$q, jsonPropertyName, subjectPropertyName));
        }
        
        add(exchanger: Exchanger): Template<T> {
            this.compositeExchanger.add(exchanger);
            return this;
        }

        addAll(exchangers: Exchanger[]): Template<T> {
            this.compositeExchanger.addAll(exchangers);
            return this;
        }
        
        fromJson(json: Object): IPromise<T> {
            var subject: T = this.subjectConstructor();
            return this.compositeExchanger.fromJson(json, subject).then(() => {
                return subject;
            });
        }

        toJson(subject: T): IPromise<any> {
            var json = {};
            return this.compositeExchanger.toJson(subject, json).then(() => {
                return json;
            });
        }
        
    }
    
}