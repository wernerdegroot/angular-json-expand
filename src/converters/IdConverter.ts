/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/domainobjects/RootObject.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import DomainObject = domainobjects.DomainObject;
    import RootObject = domainobjects.RootObject;
    import Repository = repositories.Repository;

    // Converts between an id and a domain object with this id (which should extend
    // DomainObject). It uses a Repository to do so. 
    export class IdConverter<DOMAIN_OBJECT_TYPE extends DomainObject> implements Converter<number|string, DOMAIN_OBJECT_TYPE> {

        constructor(
            private $q: IQService, 
            private repository: Repository<DOMAIN_OBJECT_TYPE, RootObject>,
            private rootObject: RootObject) {
        }

        from(id: IPromise<number|string>|number|string): IPromise<DOMAIN_OBJECT_TYPE> {
            var idPromise: IPromise<number|string> = this.$q.when(id);
            return idPromise.then((id: number|string) => {
                
                if (id === null || id === undefined) {
                    return this.$q.reject();
                }
                
                return this.repository.getById(id, this.rootObject);
            });
        }

        to(domainObject: IPromise<DOMAIN_OBJECT_TYPE>|DOMAIN_OBJECT_TYPE): IPromise<number|string> {
            var domainObjectPromise = this.$q.when(domainObject);
            return domainObjectPromise.then((domainObject: DOMAIN_OBJECT_TYPE) => {
                
                if (domainObject === null || domainObject === undefined) {
                    return this.$q.reject();
                }
                
                return domainObject.getId();
            });
        }
    }
}
