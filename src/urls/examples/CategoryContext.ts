/// <reference path="../../../src/urls/examples/RootContext.ts" />
/// <reference path="../../../src/urls/examples/Root.ts" />

module urls.examples {
	
	export class CategoryContext {
		
		constructor(private root: Root, private rootContext: RootContext) {
			
		}
		
		getRoot(): Root {
			return this.root;
		}
		
		getCategoryUrl(categoryId: string): string {
			return this.rootContext.getRootUrl() + '/' + 'categories' + '/' + categoryId; 
		}
		
	}
	
}