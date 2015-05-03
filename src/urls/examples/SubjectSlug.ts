/// <reference path="../../../src/urls/examples/Subject.ts" />
/// <reference path="../../../src/urls/examples/SubjectContext.ts" />
/// <reference path="../../../src/urls/examples/CategorySlug.ts" />

module urls.examples {
	
	export class SubjectSlug {
		
		constructor(private categorySlug: CategorySlug) {
			
		}
		
		getUrl(subject: Subject, context: SubjectContext): string {
			return this.categorySlug.getUrl(context.getCategory(), context) + '/' + 'subjects' + '/' + subject.getId(); 
		}
		
	}
	
}