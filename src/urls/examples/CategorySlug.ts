/// <reference path="../../../src/urls/examples/Category.ts" />
/// <reference path="../../../src/urls/examples/CategoryContext.ts" />
/// <reference path="../../../src/urls/examples/RootSlug.ts" />

module urls.examples {
	
	export class CategorySlug {
		
		constructor(private rootSlug: RootSlug) {
			
		}
		
		getUrl(category: Category, context: CategoryContext): string {
			return this.rootSlug.getUrl(context.getRoot(), context) + '/' + 'categories' + '/' + category.getId(); 
		}
		
	}
	
}