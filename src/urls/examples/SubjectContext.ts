/// <reference path="../../../src/urls/examples/CategoryContext.ts" />
/// <reference path="../../../src/urls/examples/Category.ts" />

module urls.examples {
	
	export class SubjectContext {
		
		constructor(private category: Category, private categoryContext: CategoryContext) {
		}
		
		getCategory(): Category {
			return this.category;
		}
		
		getSubjectUrl(subjectId: number): string {
			return this.categoryContext.getCategoryUrl(this.getCategory().getId()) + '/' + 'subjects' + '/' + subjectId; 
		}
		
	}
	
}