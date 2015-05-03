/// <reference path="../../../src/urls/examples/RootContext.ts" />
/// <reference path="../../../src/urls/examples/Root.ts" />

module urls.examples {
	
	export class CategoryContext extends RootContext {
		
		constructor(private root: Root) {
			super();
		}
		
		getRoot(): Root {
			return this.root;
		}
		
	}
	
}