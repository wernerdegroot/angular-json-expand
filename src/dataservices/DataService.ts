/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../src/resourcelocations/ResourceLocation.ts" />
/// <reference path="../../src/templates/Template.ts" />

module dataservices {
	
	import IPromise = angular.IPromise;
	import IHttpPromise = angular.IHttpPromise;
	import DomainObject = domainobjects.DomainObject;
	import IHttpService = angular.IHttpService;
	import ResourceLocation = resourcelocations.ResourceLocation;
	import Template = templates.Template;
	import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
	import IQService = angular.IQService;
	
	// Retrieves JSON objects from the server and transforms these to domain objects
	// using the provided template objects.
	export class DataService<ID_TYPE, DOMAIN_OBJECT_TYPE extends DomainObject<any>> {
		
		static injectAs: string = 'dataService';
		
		constructor(
			private $http: IHttpService, 
			private $q: IQService) {
		}
		
		getById(id: ID_TYPE, resourceLocation: ResourceLocation<ID_TYPE>, template: Template<DOMAIN_OBJECT_TYPE>): IPromise<DOMAIN_OBJECT_TYPE> {
			var domainObjectUrl: string = resourceLocation.getSingleUrl(id);
			var responsePromise: IHttpPromise<Object> = this.$http.get<Object>(domainObjectUrl);
			var responseHandler = (response: IHttpPromiseCallbackArg<Object>) => {
				return template.fromJson(response.data);
			};
			
			return responsePromise.then(responseHandler);
		}
		
		getAll(resourceLocation: ResourceLocation<ID_TYPE>, template: Template<DOMAIN_OBJECT_TYPE>): IPromise<DOMAIN_OBJECT_TYPE[]> {
			
			var self = this;
			
			var allUrl: string = resourceLocation.getAllUrl();
			var responsePromise = this.$http.get<Object[]>(allUrl);
			var responseHandler = (response: IHttpPromiseCallbackArg<Object[]>) => {
				var jsonPromises: IPromise<DOMAIN_OBJECT_TYPE>[] 
					= response.data.map((json: Object) => template.fromJson(json)); 
				return self.$q.all(jsonPromises);
			};
			
			return responsePromise.then(responseHandler);
		}
	}
	
}