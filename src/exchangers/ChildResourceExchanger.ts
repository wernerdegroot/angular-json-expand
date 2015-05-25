/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/domainobjects/DomainObject" />

module exchangers {
	
	import IPromise = angular.IPromise;
    import IQService = angular.IQService;
	import DomainObject = domainobjects.DomainObject;
	import Repository = repositories.Repository;

    export class ChildResourceExchanger<CHILD_DOMAIN_OBJECT_TYPE extends DomainObject, DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> implements Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {

        constructor(
            private $q: IQService,
            private domainObjectPropertyName: string,
			private repository: Repository<CHILD_DOMAIN_OBJECT_TYPE, DOMAIN_OBJECT_TYPE>) {
        }

        fromJson(json: Object, domainObject: DOMAIN_OBJECT_TYPE, url: string, parentObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<any> {
            return this.repository.getAll(domainObject).then((children: CHILD_DOMAIN_OBJECT_TYPE[]) => {
				domainObject[this.domainObjectPropertyName] = children;
			});
        }

        toJson(domainObject: DomainObject, json: Object): IPromise<any> {
            // Do nothing.
			return this.$q.when(undefined);
        }
    }
	
}