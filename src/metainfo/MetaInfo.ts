/// <reference path="../../src/domainobjects/DomainObject.ts" />

module metainfo {
	
	import DomainObject = domainobjects.DomainObject;
	
	export class MetaInfo {
		
		public static META_INFO_PROPERTY_NAME = '_metaInfo';
		
		constructor(
			private id: string|number,
			private url: string,
			private parentDomainObject: DomainObject) {		
		}
		
		getId(): string|number {
			return this.id;
		}
		
		getUrl(): string {
			return this.url;
		}
		
		getParentDomainObject(): DomainObject {
			return this.parentDomainObject;
		}
		
	}
	
}