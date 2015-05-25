/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />
/// <reference path="../../src/dataservices/UrlBuilder.ts" />
/// <reference path="../../src/metainfo/MetaInfo.ts" />

module dataservices {
	
	import IPromise = angular.IPromise;
	import IHttpPromise = angular.IHttpPromise;
	import DomainObject = domainobjects.DomainObject;
	import IHttpService = angular.IHttpService;
	import ObjectMapper = objectmappers.ObjectMapper;
	import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
	import IQService = angular.IQService;
	import MetaInfo = metainfo.MetaInfo;
	
	// Retrieves JSON objects from the server and transforms these to domain objects
	// using the provided ObjectMapper.
	export class DataService {
		
		static injectAs: string = 'dataService';
		
		constructor(
			private $http: IHttpService, 
			private $q: IQService,
			private urlBuilder: UrlBuilder) {
		}
		
		getSingle<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject>(id: number|string, slug: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE, objectMapper: ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>): IPromise<DOMAIN_OBJECT_TYPE> {
			var url: string = this.urlBuilder.buildSingleUrl(id, slug, parentDomainObject);
			var responsePromise: IHttpPromise<Object> = this.$http.get<Object>(url);
			var responseHandler = (response: IHttpPromiseCallbackArg<Object>) => {
				return objectMapper.fromJson(response.data, url, parentDomainObject);
			};
			
			return responsePromise.then(responseHandler);
		}
		
		getCollection<DOMAIN_OBJECT_TYPE extends DomainObject, PARENT_DOMAIN_OBJECT_TYPE extends DomainObject>(slug: string, parentDomainObject: PARENT_DOMAIN_OBJECT_TYPE, objectMapper: ObjectMapper<DOMAIN_OBJECT_TYPE, PARENT_DOMAIN_OBJECT_TYPE>): IPromise<DOMAIN_OBJECT_TYPE[]> {
			
			var self = this;
			
			var allUrl: string = this.urlBuilder.buildCollectionUrl(slug, parentDomainObject);
			var responsePromise = this.$http.get<Object[]>(allUrl);
			var responseHandler = (response: IHttpPromiseCallbackArg<Object[]>) => {
				var jsonPromises: IPromise<DOMAIN_OBJECT_TYPE>[] 
					= response.data.map((json: Object) => objectMapper.fromJson(json, slug, parentDomainObject)); 
				return self.$q.all(jsonPromises);
			};
			
			return responsePromise.then(responseHandler);
		}
	}
	
}