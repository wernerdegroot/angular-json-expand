/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/metainfo/MetaInfo.ts" />

module domainobjects {
	
	import MetaInfo = metainfo.MetaInfo;

    export class RootObject implements DomainObject {        
        
		constructor(rootUrl: string) {
			this[MetaInfo.META_INFO_PROPERTY_NAME] = new MetaInfo(rootUrl, null);
		}
		
		getId(): number|string {
			throw new Error('Method getId of RootObject should not have been called!');
		}
		
    }
}
