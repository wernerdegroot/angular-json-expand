/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/exchangers/Exchanger.ts" />
/// <reference path="../../src/domainobjects/DomainObject" />
/// <reference path="../../src/metainfo/MetaInfo.ts" />

module exchangers {
	
	import IPromise = angular.IPromise;
	import DomainObject = domainobjects.DomainObject;
	import MetaInfo = metainfo.MetaInfo;
	import IQService = angular.IQService;
	
	export class MetaInfoExchanger<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject> implements Exchanger<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE> {
		
		constructor(
            private $q: IQService) {		
		}
		
		// Transfer data from a JSON object to a domain object.
        // Returns a promise when the data is transferred.
        fromJson(json: Object, domainObject: DOMAIN_OBJECT_TYPE, id: string|number, url: string, parentObject: PARENT_DOMAIN_OBJECT_TYPE): IPromise<any> {
            var metaInfo: MetaInfo = new MetaInfo(id, url, parentObject);
			domainObject[MetaInfo.META_INFO_PROPERTY_NAME] = metaInfo;
			return this.$q.when();
		}
        
        // Transfer data from a domain object to a JSON object.
        // Returns a promise when the data is transferred.
        toJson(domainObject: DomainObject, json: Object): IPromise<any> {
			// Do nothing.
			return this.$q.when();
		}
		
	}
	
}