/// <reference path="../../../src/urls/examples/Subject.ts" />
/// <reference path="../../../src/urls/examples/SubjectContext.ts" />
/// <reference path="../../../src/urls/examples/CategorySlug.ts" />

module urls.examples {
	
	export class SubjectSlug {
		
		constructor(private categorySlug: CategorySlug) {
			
		}
		
		getUrl(subjectId: number, context: SubjectContext): string {
			return this.categorySlug.getUrl(context.getCategory().getId(), context) + '/' + 'subjects' + '/' + subjectId; 
		}
		
	}
	
}