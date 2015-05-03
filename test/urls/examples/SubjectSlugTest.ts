/// <reference path="../../../test/test-dependencies.ts" />
/// <reference path="../../../src/urls/examples/Root.ts" />
/// <reference path="../../../src/urls/examples/Category.ts" />
/// <reference path="../../../src/urls/examples/Subject.ts" />
/// <reference path="../../../src/urls/examples/SubjectContext.ts" />

module urls.examples {

    describe('SubjectSlug', () => {

        it('should return the correct url', () => {

            var root = new Root();
            var category = new Category();
            var subject = new Subject();
            
            var subjectContext = new SubjectContext(root, category);
            
            expect(subjectContext.getSubjectUrl(subject.getId())).to.equal('/api/categories/second/subjects/4');
            
        });
    });
}
