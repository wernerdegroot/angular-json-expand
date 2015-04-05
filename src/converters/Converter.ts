/// <reference path="../../src/dependencies.ts" />

module converters {

    import IPromise = angular.IPromise;

    export interface Converter<S, T> {

        from(s: IPromise<S>|S): IPromise<T>;
        to(t: IPromise<T>|T): IPromise<S>;
    }


}
