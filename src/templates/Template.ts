/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/CompositeExchanger.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />

module templates {
    
    import CompositeExchanger = exchangers.CompositeExchanger;
    import Exchanger = exchangers.Exchanger;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;
    
    export class Template<T> {
        
        private compositeExchanger: CompositeExchanger;

        constructor(private $q: IQService, private subjectConstructor: () => T) {
            this.compositeExchanger = new CompositeExchanger($q);
        }
        
        add(exchanger: Exchanger) {
            this.compositeExchanger.add(exchanger);
        }

        addAll(exchangers: Exchanger[]) {
            this.compositeExchanger.addAll(exchangers);
        }
        
        fromJson(json: Object): IPromise<any> {
            var subject: T = this.subjectConstructor();
            return this.compositeExchanger.fromJson(json, subject);
        }

        toJson(subject: T): IPromise<any> {
            var json = {};
            return this.compositeExchanger.toJson(subject, json);
        }
        
    }
    
}