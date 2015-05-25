/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../test/metainfo/MockMetaInfo.ts" />
/// <reference path="../../src/metainfo/MetaInfo.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />
/// <reference path="../../src/dataservices/UrlBuilder.ts" />

module dataservices {
	
	import MockDomainObject = domainobjects.MockDomainObject;
	import MockMetaInfo = metainfo.MockMetaInfo;
	import MetaInfo = metainfo.MetaInfo;
	
	describe('UrlBuilder', () => {
		
		var metaInfoUrl = 'http://localhost:8080/api';
		var slug = 'slug';
		var id = 14;
		var metaInfo;
		var domainObject;
		var domainObjectWithoutMetaInfo;
		
		beforeEach(() => {
			
			domainObjectWithoutMetaInfo = new MockDomainObject();
			
			metaInfo = new MockMetaInfo();
			metaInfo.getUrl.returns(metaInfoUrl);
			
			domainObject = new MockDomainObject();
			domainObject[MetaInfo.META_INFO_PROPERTY_NAME] = metaInfo;
			
		});
		
		describe('buildCollectionUrl', () => {
			
			it('should throw an exception when no meta info is present', () => {
			
				var urlBuilder = new UrlBuilder();
				
				expect(() => urlBuilder.buildCollectionUrl(slug, domainObjectWithoutMetaInfo)).to.throw('No meta info present on parent domain object!');
				
			});
			
			it('should return url of parent object appended with the slug', () => {
				
				var urlBuilder = new UrlBuilder();
				
				expect(urlBuilder.buildCollectionUrl(slug, domainObject)).to.equal(metaInfoUrl + '/' + slug);
				
			});
			
		});
		
		describe('buildSingleUrl', () => {
			
			it('should throw an exception on a call to buildSingleUrl when no meta info is present', () => {
			
				var urlBuilder = new UrlBuilder();
				
				expect(() => urlBuilder.buildSingleUrl(id, slug, domainObjectWithoutMetaInfo)).to.throw('No meta info present on parent domain object!');
				
			});
			
			it('should return url of parent object appended with the slug and the id', () => {
				
				var urlBuilder = new UrlBuilder();
				
				expect(urlBuilder.buildSingleUrl(id, slug, domainObject)).to.equal(metaInfoUrl + '/' + slug + '/' + id);
				
			});
			
		});
		
	});
	
}