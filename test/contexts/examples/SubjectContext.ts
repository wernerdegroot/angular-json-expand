/// <reference path="../../../src/contexts/Context.ts" />
/// <reference path="../../../test/contexts/examples/CategoryContext.ts" />
/// <reference path="../../../test/contexts/examples/Category.ts" />

module urls.examples {
	
	export class SubjectContext implements Context<number> {
		
		private static subjectSlug: string = '/subjects';
		private subjectUrl;
		
		constructor(private category: Category, categoryContext: CategoryContext) {
			this.subjectUrl = categoryContext.getSingleUrl(category.getId()) + SubjectContext.subjectSlug;
		}
		
		getCategory(): Category {
			return this.category;
		}
		
		getSingleUrl(subjectId: number): string {
			return this.subjectUrl + '/' + subjectId; 
		}
		
		getAllUrl(): string {
			return this.subjectUrl;
		}
		
	}
	
}