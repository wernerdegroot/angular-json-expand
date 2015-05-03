/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />
/// <reference path="../../src/contexts/Context.ts" />
/// <reference path="../../src/templates/Template.ts" />

module repositories {
	
	import IPromise = angular.IPromise;
	import IdSubject = subjects.IdSubject;
	import IHttpService = angular.IHttpService;
	import Context = contexts.Context;
	import Template = templates.Template;
	import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg
	
	export class DefaultRepository<ID_TYPE, SUBJECT_TYPE extends IdSubject<any>> /*implements Repository<ID_TYPE, SUBJECT_TYPE>*/ {
		
		constructor(private $http: IHttpService) {
			
		}
		
		getById(id: ID_TYPE, context: Context<ID_TYPE>, template: Template<SUBJECT_TYPE>): IPromise<SUBJECT_TYPE> {
			return this.$http.get<Object>(context.getSingleUrl(id)).then((response: IHttpPromiseCallbackArg<Object>) => {
				return template.fromJson(response.data);
			});	 
		}
	}
	
}