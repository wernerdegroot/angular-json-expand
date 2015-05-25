/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import DomainObject = domainobjects.DomainObject;

    // Exchanges data between a JSON object and a domain object.
    export interface Exchanger<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> {

        // Transfer data from a JSON object to a domain object.
        // Returns a promise when the data is transferred.
        fromJson(json: Object, domainObject: DOMAIN_OBJECT_TYPE, url: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<any>;
        
        // Transfer data from a domain object to a JSON object.
        // Returns a promise when the data is transferred.
        toJson(domainObject: DOMAIN_OBJECT_TYPE, json: Object): IPromise<any>;

    }
}
