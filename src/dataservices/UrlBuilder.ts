/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/metainfo/MetaInfo.ts" />

module dataservices {
	
	import DomainObject = domainobjects.DomainObject;
	import MetaInfo = metainfo.MetaInfo;
	
	export class UrlBuilder {
		
		static injectAs: string = 'urlBuilder';
		
		buildSingleUrl(id: number|string, slug: string, parentDomainObject: DomainObject): string {
			return this.buildCollectionUrl(slug, parentDomainObject) + '/' + id;
		}
		
		buildCollectionUrl(slug: string, parentDomainObject: DomainObject): string {
			var metaInfo: MetaInfo = parentDomainObject[MetaInfo.META_INFO_PROPERTY_NAME];
			if (metaInfo === undefined || metaInfo === null) {
				throw new Error('No meta info present on parent domain object!');
			}
			
			var parentUrl: string = metaInfo.getUrl();
			return parentUrl + '/' + slug;
		}
		
	}
	
}