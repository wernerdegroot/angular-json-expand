/// <reference path="../../../test/test-dependencies.ts" />
/// <reference path="../../../src/urls/examples/Root.ts" />
/// <reference path="../../../src/urls/examples/RootContext.ts" />
/// <reference path="../../../src/urls/examples/Category.ts" />
/// <reference path="../../../src/urls/examples/CategoryContext.ts" />
/// <reference path="../../../src/urls/examples/Subject.ts" />
/// <reference path="../../../src/urls/examples/SubjectContext.ts" />

module urls.examples {

    describe('SubjectSlug', () => {

        it('should return the correct url', () => {

            var root = new Root();
            var category = new Category();
            var subject = new Subject();
            
            var rootContext = new RootContext();
            var categoryContext = new CategoryContext(root, rootContext);
            var subjectContext = new SubjectContext(category, categoryContext);
            
            expect(subjectContext.getUrl(subject.getId())).to.equal('/api/categories/second/subjects/4');
            
        });
    });
}
