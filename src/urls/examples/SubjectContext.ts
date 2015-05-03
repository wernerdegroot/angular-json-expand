/// <reference path="../../../src/urls/Context.ts" />
/// <reference path="../../../src/urls/examples/CategoryContext.ts" />
/// <reference path="../../../src/urls/examples/Category.ts" />

module urls.examples {
	
	export class SubjectContext implements Context<number> {
		
		constructor(private category: Category, private categoryContext: CategoryContext) {
		}
		
		getCategory(): Category {
			return this.category;
		}
		
		getUrl(subjectId: number): string {
			return this.categoryContext.getUrl(this.getCategory().getId()) + '/' + 'subjects' + '/' + subjectId; 
		}
		
	}
	
}