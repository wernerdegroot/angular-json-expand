/// <reference path="../../src/domainobjects/DomainObject.ts" />

module metainfo {
	
	import DomainObject = domainobjects.DomainObject;
	
	export class MetaInfo {
		
		public static META_INFO_PROPERTY_NAME = '_metaInfo';
		
		constructor(
			private url: string,
			private parentDomainObject: DomainObject) {		
		}
		
		getUrl(): string {
			return this.url;
		}
		
		getParentDomainObject(): DomainObject {
			return this.parentDomainObject;
		}
		
	}
	
}