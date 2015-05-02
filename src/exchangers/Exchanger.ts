/// <reference path="../../src/dependencies.ts" />

module exchangers {

    import IPromise = angular.IPromise;

    export interface Exchanger {

        fromJson(json: Object, subject: Object): IPromise<any>;
        toJson(subject: Object, json: Object): IPromise<any>;

    }
}
