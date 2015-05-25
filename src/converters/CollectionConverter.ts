/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    export class CollectionConverter<S, T> implements Converter<S[], T[]> {

        constructor(
			private $q: IQService,
            private converterToApplyToElements: Converter<S, T>) {
        }

        from(sCollection: IPromise<S[]>|S[]): IPromise<T[]> {
            return this.$q.when(sCollection).then((sCollectionResolved: S[]) => {
                
                if (sCollectionResolved === null || sCollectionResolved === undefined) {
                    return this.$q.reject();
                }
                
                // Turn a collection of S-instaces into a collection of promises to a T-instance.
                var tPromises = sCollectionResolved.map((s: S) => this.converterToApplyToElements.from(s));
                
                // Turn the collection of promises into an promise to a collection. 
                return this.$q.all(tPromises);
            });
        }

        to(tCollection: IPromise<T[]>|T[]): IPromise<S[]> {
            return this.$q.when(tCollection).then((tCollectionResolved: T[]) => {
                
                if (tCollectionResolved === null || tCollectionResolved === undefined) {
                    return this.$q.reject();
                }
                
                // Turn a collection of T-instaces into a collection of promises to a S-instance.
                var sPromises = tCollectionResolved.map((t: T) => this.converterToApplyToElements.to(t));
                
                // Turn the collection of promises into an promise to a collection. 
                return this.$q.all(sPromises);
            });
        }

    }

}
