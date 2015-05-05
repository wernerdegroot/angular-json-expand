/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    // Transfers data between a JSON object to a subject and vice versa
    // in the simplest way possible.
    export class DefaultExchanger implements Exchanger {

        constructor(
            private $q: IQService,
            private jsonPropertyName: string,
            private subjectPropertyName: string) {
        }

        fromJson(json: Object, subject: Object): IPromise<any> {
            var jsonValue = json[this.jsonPropertyName];
            subject[this.subjectPropertyName] = jsonValue;
            return this.$q.when(undefined);
        }

        toJson(subject: Object, json: Object): IPromise<any> {
            var subjectValue = subject[this.subjectPropertyName];
            json[this.jsonPropertyName] = subjectValue;
            return this.$q.when(undefined);
        }
    }
}
