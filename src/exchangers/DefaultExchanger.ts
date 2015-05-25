/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import DomainObject = domainobjects.DomainObject;

    // Transfers data between a JSON object to a domain object and vice versa
    // in the simplest way possible.
    export class DefaultExchanger<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> implements Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {

        constructor(
            private $q: IQService,
            private jsonPropertyName: string,
            private domainObjectPropertyName: string) {
        }

        fromJson(json: Object, domainObject: DOMAIN_OBJECT_TYPE, id: string|number, url: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<any> {
            var jsonValue = json[this.jsonPropertyName];
            domainObject[this.domainObjectPropertyName] = jsonValue;
            return this.$q.when(undefined);
        }

        toJson(domainObject: DOMAIN_OBJECT_TYPE, json: Object): IPromise<any> {
            var domainObjectValue = domainObject[this.domainObjectPropertyName];
            json[this.jsonPropertyName] = domainObjectValue;
            return this.$q.when(undefined);
        }
    }
}
