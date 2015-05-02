/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    export class CompositeExchanger implements Exchanger {

        private exchangers: Exchanger[] = [];

        constructor(private $q: IQService) {

        }

        add(exchanger: Exchanger) {
            this.exchangers.push(exchanger);
        }

        addAll(exchangers: Exchanger[]) {
            exchangers.forEach((exchanger: Exchanger) => {
                this.add(exchanger);
            });
        }

        fromJson(json: Object, subject: Object): IPromise<any> {
            var promises: IPromise<any>[] = [];
            this.exchangers.forEach((exchanger: Exchanger) => {
                promises.push(exchanger.fromJson(json, subject));
            });
            return this.$q.all(promises);
        }

        toJson(subject: Object, json: Object): IPromise<any> {
            var promises: IPromise<any>[] = [];
            this.exchangers.forEach((exchanger: Exchanger) => {
                promises.push(exchanger.toJson(subject, json));
            });
            return this.$q.all(promises);
        }
    }
}
