/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />
/// <reference path="../../src/contexts/Context.ts" />
/// <reference path="../../src/templates/Template.ts" />

module dataservices {
	
	import IPromise = angular.IPromise;
	import IHttpPromise = angular.IHttpPromise;
	import IdSubject = subjects.IdSubject;
	import IHttpService = angular.IHttpService;
	import Context = contexts.Context;
	import Template = templates.Template;
	import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
	import IQService = angular.IQService;
	
	// Retrieves JSON objects from the server and transforms these to domain objects
	// using the provided template objects.
	export class DataService<ID_TYPE, SUBJECT_TYPE extends IdSubject<any>> {
		
		static injectAs: string = 'dataService';
		
		constructor(
			private $http: IHttpService, 
			private $q: IQService) {
		}
		
		getById(id: ID_TYPE, context: Context<ID_TYPE>, template: Template<SUBJECT_TYPE>): IPromise<SUBJECT_TYPE> {
			var subjectUrl: string = context.getSingleUrl(id);
			var responsePromise: IHttpPromise<Object> = this.$http.get<Object>(subjectUrl);
			var responseHandler = (response: IHttpPromiseCallbackArg<Object>) => {
				return template.fromJson(response.data);
			};
			
			return responsePromise.then(responseHandler);
		}
		
		getAll(context: Context<ID_TYPE>, template: Template<SUBJECT_TYPE>): IPromise<SUBJECT_TYPE[]> {
			
			var self = this;
			
			var allUrl: string = context.getAllUrl();
			var responsePromise = this.$http.get<Object[]>(allUrl);
			var responseHandler = (response: IHttpPromiseCallbackArg<Object[]>) => {
				var jsonPromises: IPromise<SUBJECT_TYPE>[] 
					= response.data.map((json: Object) => template.fromJson(json)); 
				return self.$q.all(jsonPromises);
			};
			
			return responsePromise.then(responseHandler);
		}
	}
	
}