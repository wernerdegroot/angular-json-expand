/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    export class PipedConverter<S, T, U> implements Converter<S, U> {

        constructor(private first: Converter<S, T>, private second: Converter<T, U>) {

        }

        from(s: IPromise<S>|S): IPromise<U> {
            var t: IPromise<T> = this.first.from(s);
            return this.second.from(t);
        }

        to(u: IPromise<U>|U): IPromise<S> {
            var t: IPromise<T> = this.second.to(u);
            return this.first.to(t);
        }

    }

}
