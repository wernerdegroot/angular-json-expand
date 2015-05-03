/// <reference path="../../../src/contexts/Context.ts" />
/// <reference path="../../../test/contexts/examples/RootContext.ts" />
/// <reference path="../../../test/contexts/examples/Root.ts" />

module urls.examples {
	
	export class CategoryContext implements Context<string> {
		
		private static categorySlug: string = '/categories';
		private categoryUrl: string;
		
		constructor(private root: Root, rootContext: RootContext) {
			this.categoryUrl = rootContext.getSingleUrl() + CategoryContext.categorySlug; 
		}
		
		getRoot(): Root {
			return this.root;
		}
		
		getSingleUrl(categoryId: string): string {
			return this.categoryUrl + '/' + categoryId; 
		}
		
		getAllUrl(): string {
			return this.categoryUrl;
		}
		
	}
	
}