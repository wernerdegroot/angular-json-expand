/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    // Combines several Exchanger instances to act as one single Exchanger. 
    // When this Exchanger is asked to transfer data between a JSON object 
    // and a subject this request is dispatched to each contained Exchanger 
    // instance. 
    export class CompositeExchanger implements Exchanger {

        private exchangers: Exchanger[] = [];

        constructor(
            private $q: IQService) {
        }

        add(exchanger: Exchanger) {
            this.exchangers.push(exchanger);
        }

        // Returns a Promise that is resolved when all data is exchanged.
        fromJson(json: Object, subject: Object): IPromise<any> {
            var promises: IPromise<any>[] = [];
            this.exchangers.forEach((exchanger: Exchanger) => {
                promises.push(exchanger.fromJson(json, subject));
            });
            return this.$q.all(promises);
        }

        // Returns a Promise that is resolved when all data is exchanged.
        toJson(subject: Object, json: Object): IPromise<any> {
            var promises: IPromise<any>[] = [];
            this.exchangers.forEach((exchanger: Exchanger) => {
                promises.push(exchanger.toJson(subject, json));
            });
            return this.$q.all(promises);
        }
    }
}
