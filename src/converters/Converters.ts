/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/domainobjects/RootObject.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/converters/IdConverter.ts" />

module converters {
	
	import IQService = angular.IQService;
	import RootObject = domainobjects.RootObject;
    import Repository = repositories.Repository;
	import DomainObject = domainobjects.DomainObject;
	import IdConverter = converters.IdConverter;
	
	export class Converters {
		
		static injectAs: string = 'converters';
		
		constructor(
            private $q: IQService) {
        }
		
		idConverter<DOMAIN_OBJECT_TYPE extends DomainObject>(repository: Repository<DOMAIN_OBJECT_TYPE, RootObject>, rootObject: RootObject) {
			return new IdConverter(this.$q, repository, rootObject);
		}
		
	}
	
}