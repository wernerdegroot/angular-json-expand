/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/CompositeExchanger.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/exchangers/DefaultExchanger.ts" />
/// <reference path="../../src/exchangers/MetaInfoExchanger.ts" />
/// <reference path="../../src/exchangers/ChildResourceExchanger.ts" />
/// <reference path="../../src/exchangers/ConvertingExchanger.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module objectmappers {
    
    import CompositeExchanger = exchangers.CompositeExchanger;
    import Exchanger = exchangers.Exchanger;
    import DefaultExchanger = exchangers.DefaultExchanger;
    import MetaInfoExchanger = exchangers.MetaInfoExchanger;
    import ChildResourceExchanger = exchangers.ChildResourceExchanger;
    import ConvertingExchanger = exchangers.ConvertingExchanger;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;
    import DomainObject = domainobjects.DomainObject;
    import Repository = repositories.Repository;
    import Converter = converters.Converter;
    
    export class ObjectMapper<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> {
        
        private compositeExchanger: CompositeExchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>;

        constructor(
            private $q: IQService, 
            private domainObjectConstructor: () => DOMAIN_OBJECT_TYPE) {
            
            // Create a CompositeExchanger.
            this.compositeExchanger = new CompositeExchanger($q);
            
            // Make sure that meta info is added to each domain object that is
            // created through this ObjectMapper.
            this.compositeExchanger.add(new MetaInfoExchanger($q));
        }
        
        defaultExchanger(jsonPropertyName: string, domainObjectPropertyName: string): ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {
            return this.add(new DefaultExchanger(this.$q, jsonPropertyName, domainObjectPropertyName));
        }
        
        childResourceExchanger<CHILD_DOMAIN_OBJECT_TYPE extends DomainObject>(domainObjectPropertyName: string, repository: Repository<CHILD_DOMAIN_OBJECT_TYPE, DOMAIN_OBJECT_TYPE>) {
            return this.add(new ChildResourceExchanger<CHILD_DOMAIN_OBJECT_TYPE, DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>(this.$q, domainObjectPropertyName, repository));
        }
        
        convertingExchanger<S, T>(jsonPropertyName: string, domainObjectPropertyName: string, converter: Converter<S, T>) {
            return this.add(new ConvertingExchanger<S, T, DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>(converter, jsonPropertyName, domainObjectPropertyName));
        }
        
        add(exchanger: Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>): ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {
            this.compositeExchanger.add(exchanger);
            return this;
        }

        fromJson(json: Object, url: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<DOMAIN_OBJECT_TYPE> {
            var domainObject: DOMAIN_OBJECT_TYPE = this.domainObjectConstructor();
            return this.compositeExchanger.fromJson(json, domainObject, url, parentDomainObject).then(() => {
                return domainObject;
            });
        }

        toJson(domainObject: DOMAIN_OBJECT_TYPE): IPromise<any> {
            var json = {};
            return this.compositeExchanger.toJson(domainObject, json).then(() => {
                return json;
            });
        }
        
    }
    
}