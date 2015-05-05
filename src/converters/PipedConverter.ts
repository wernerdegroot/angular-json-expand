/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    // Chains two Converter-instances. It takes both a Converter between S and T 
    // and a Converter between T and U and acts as a Converter between S and U.
    export class PipedConverter<S, T, U> implements Converter<S, U> {

        constructor(
            private first: Converter<S, T>, 
            private second: Converter<T, U>) {
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
