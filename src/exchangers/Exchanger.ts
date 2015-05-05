/// <reference path="../../src/dependencies.ts" />

module exchangers {

    import IPromise = angular.IPromise;

    // Exchanges data between a JSON object and a domain object.
    export interface Exchanger {

        // Transfer data from a JSON object to a domain object.
        // Returns a promise when the data is transferred.
        fromJson(json: Object, domainObject: Object): IPromise<any>;
        
        // Transfer data from a domain object to a JSON object.
        // Returns a promise when the data is transferred.
        toJson(domainObject: Object, json: Object): IPromise<any>;

    }
}
