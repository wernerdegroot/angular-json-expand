/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import DomainObject = domainobjects.DomainObject;

    // Combines several Exchanger instances to act as one single Exchanger. 
    // When this Exchanger is asked to transfer data between a JSON object 
    // and a domain object this request is dispatched to each contained Exchanger 
    // instance. 
    export class CompositeExchanger<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> implements Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {

        private exchangers: Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>[] = [];

        constructor(
            private $q: IQService) {
        }

        add(exchanger: Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>) {
            this.exchangers.push(exchanger);
        }

        // Returns a Promise that is resolved when all data is exchanged.
        fromJson(json: Object, domainObject: DOMAIN_OBJECT_TYPE, id: string|number, url: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<any> {
            var promises: IPromise<any>[] = [];
            this.exchangers.forEach((exchanger: Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>) => {
                promises.push(exchanger.fromJson(json, domainObject, id, url, parentDomainObject));
            });
            return this.$q.all(promises);
        }

        // Returns a Promise that is resolved when all data is exchanged.
        toJson(domainObject: DOMAIN_OBJECT_TYPE, json: Object): IPromise<any> {
            var promises: IPromise<any>[] = [];
            this.exchangers.forEach((exchanger: Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>) => {
                promises.push(exchanger.toJson(domainObject, json));
            });
            return this.$q.all(promises);
        }
    }
}
