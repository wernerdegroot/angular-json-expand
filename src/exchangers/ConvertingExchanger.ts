/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import Converter = converters.Converter;
    import DomainObject = domainobjects.DomainObject;

    // Transfers data between a JSON object to a domain object and vice versa.
    // Gives the user the chance to convert the data to another format
    // before the data is transferred.
    export class ConvertingExchanger<S, T, DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> implements Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {

        constructor(
            private converter: Converter<S, T>,
            private jsonPropertyName: string,
            private domainObjectPropertyName: string) {
        }

        fromJson(json: Object, domainObject: DOMAIN_OBJECT_TYPE, id: string|number, url: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<any> {
            var jsonValue: S = <S> json[this.jsonPropertyName];
            var domainObjectValuePromise: IPromise<T> = this.converter.from(jsonValue);
            return domainObjectValuePromise.then((domainObjectValue: T) => {
                domainObject[this.domainObjectPropertyName] = domainObjectValue;
            });
        }

        toJson(domainObject: DOMAIN_OBJECT_TYPE, json: Object): IPromise<any> {
            var domainObjectValue: T = <T> domainObject[this.domainObjectPropertyName];
            var jsonValuePromise: IPromise<S> = this.converter.to(domainObjectValue);
            return jsonValuePromise.then((jsonValue: S) => {
                json[this.jsonPropertyName] = jsonValue;
            });
        }
    }
}
