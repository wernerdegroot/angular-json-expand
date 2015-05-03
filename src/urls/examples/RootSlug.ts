/// <reference path="../../../src/urls/examples/Root.ts" />
/// <reference path="../../../src/urls/examples/RootContext.ts" />

module urls.examples {
	
	export class RootSlug {
		
		getUrl(category: Root, context: RootContext): string {
			return '/api';
		}
		
	}
	
}