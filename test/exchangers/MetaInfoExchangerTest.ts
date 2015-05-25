/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/MetaInfoExchanger.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />
/// <reference path="../../src/metainfo/MetaInfo.ts" />

module exchangers {
	
	import MockDomainObject = domainobjects.MockDomainObject;
	import IRootScopeService = angular.IRootScopeService;
	import MetaInfo = metainfo.MetaInfo;
	import IQService = angular.IQService;
	
	describe('MetaInfoExchanger', () => {
		
		// Constants:
		var url = 'http://localhost:8080/api';
		
		// Mocks and services:
		var q: IQService;
		var rootScope: IRootScopeService;
		
		beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
			
			q = $q;
            rootScope = $rootScope;
		}));
		
		afterEach(() => {
            rootScope.$digest();
        });
		
		it('should add meta info to the domain object', () => {
			
			var domainObject = new MockDomainObject();
            var parentDomainObject = new MockDomainObject();
			
			var metaInfoExchanger = new MetaInfoExchanger(q);
			var metaInfoAddedPromise = metaInfoExchanger.fromJson({}, domainObject, url, parentDomainObject);
			metaInfoAddedPromise.then(() => {
				
				var metaInfo: MetaInfo = domainObject[MetaInfo.META_INFO_PROPERTY_NAME];
				
				expect(metaInfo.getParentDomainObject()).to.equal(parentDomainObject);
				expect(metaInfo.getUrl()).to.equal(url);
			});
			
		});
		
		it('should return a resolved promise (but do nothing) when toJson is called', () => {
			
			var domainObject = new MockDomainObject();
			
			var metaInfoExchanger = new MetaInfoExchanger(q);
			
			expect(metaInfoExchanger.toJson(domainObject, {})).to.not.be.rejected;
		});
		
	});
	
}