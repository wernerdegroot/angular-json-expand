/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module exchangers {

    import Converter = converters.Converter;

    export class ConvertingExchanger<S, T> implements Exchanger {

        private converter: Converter<S, T>;

        constructor(converter: Converter<S, T>, private jsonPropertyName: string, private subjectPropertyName: string) {
            this.converter = converter;
        }

        fromJson(json: Object, subject: Object): void {
            var jsonValue = <S> json[this.jsonPropertyName];
            var subjectValue = this.converter.from(jsonValue);
            subject[this.subjectPropertyName] = subjectValue;
        }

        toJson(subject: Object, json: Object): void {
            var subjectValue = <T> subject[this.subjectPropertyName];
            var jsonValue = this.converter.to(subjectValue);
            json[this.jsonPropertyName] = jsonValue;
        }
    }
}
