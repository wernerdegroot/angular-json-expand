/// <reference path="../../../src/urls/Context.ts" />
/// <reference path="../../../src/urls/examples/RootContext.ts" />
/// <reference path="../../../src/urls/examples/Root.ts" />

module urls.examples {
	
	export class CategoryContext implements Context<string> {
		
		constructor(private root: Root, private rootContext: RootContext) {
			
		}
		
		getRoot(): Root {
			return this.root;
		}
		
		getUrl(categoryId: string): string {
			return this.rootContext.getUrl(-1) + '/' + 'categories' + '/' + categoryId; 
		}
		
	}
	
}