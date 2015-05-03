/// <reference path="../../../src/urls/Context.ts" />

module urls.examples {
	
	export class RootContext implements Context<number> {
		
		constructor() {
			
		}
		
		getUrl(dummy: number): string {
			return '/api';
		}
		
	}
	
}