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