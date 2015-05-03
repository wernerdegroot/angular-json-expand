/// <reference path="../../../src/urls/examples/CategoryContext.ts" />
/// <reference path="../../../src/urls/examples/Category.ts" />

module urls.examples {
	
	export class SubjectContext extends CategoryContext {
		
		constructor(root: Root, private category: Category) {
			super(root);
		}
		
		getCategory(): Category {
			return this.category;
		}
		
	}
	
}