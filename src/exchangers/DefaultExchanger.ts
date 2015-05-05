/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    // Transfers data between a JSON object to a domain object and vice versa
    // in the simplest way possible.
    export class DefaultExchanger implements Exchanger {

        constructor(
            private $q: IQService,
            private jsonPropertyName: string,
            private domainObjectPropertyName: string) {
        }

        fromJson(json: Object, domainObject: Object): IPromise<any> {
            var jsonValue = json[this.jsonPropertyName];
            domainObject[this.domainObjectPropertyName] = jsonValue;
            return this.$q.when(undefined);
        }

        toJson(domainObject: Object, json: Object): IPromise<any> {
            var domainObjectValue = domainObject[this.domainObjectPropertyName];
            json[this.jsonPropertyName] = domainObjectValue;
            return this.$q.when(undefined);
        }
    }
}
