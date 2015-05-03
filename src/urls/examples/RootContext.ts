/// <reference path="../../../src/urls/Context.ts" />

module urls.examples {
	
	export class RootContext implements Context<void> {
		
		private static rootUrl: string = '/api';
		
		constructor() {
			
		}
		
		getSingleUrl(): string {
			return RootContext.rootUrl;
		}
		
		getAllUrl(): string {
			return RootContext.rootUrl;
		}
		
	}
	
}