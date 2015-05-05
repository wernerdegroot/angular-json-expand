/// <reference path="../../src/dependencies.ts" />

module exchangers {

    import IPromise = angular.IPromise;

    // Exchanges data between a JSON object and a subject.
    export interface Exchanger {

        // Transfer data from a JSON object to a subject.
        // Returns a promise when the data is transferred.
        fromJson(json: Object, subject: Object): IPromise<any>;
        
        // Transfer data from a subject to a JSON object.
        // Returns a promise when the data is transferred.
        toJson(subject: Object, json: Object): IPromise<any>;

    }
}
