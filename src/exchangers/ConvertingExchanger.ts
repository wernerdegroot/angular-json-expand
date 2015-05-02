/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import Converter = converters.Converter;

    export class ConvertingExchanger<S, T> implements Exchanger {

        constructor(
            private converter: Converter<S, T>,
            private jsonPropertyName: string,
            private subjectPropertyName: string) {

        }

        fromJson(json: Object, subject: Object): IPromise<any> {
            var jsonValue: S = <S> json[this.jsonPropertyName];
            var subjectValuePromise: IPromise<T> = this.converter.from(jsonValue);
            return subjectValuePromise.then((subjectValue: T) => {
                subject[this.subjectPropertyName] = subjectValue;
            });
        }

        toJson(subject: Object, json: Object): IPromise<any> {
            var subjectValue: T = <T> subject[this.subjectPropertyName];
            var jsonValuePromise: IPromise<S> = this.converter.to(subjectValue);
            return jsonValuePromise.then((jsonValue: S) => {
                json[this.jsonPropertyName] = jsonValue;
            });
        }
    }
}
