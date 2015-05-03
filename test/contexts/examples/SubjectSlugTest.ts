/// <reference path="../../../test/test-dependencies.ts" />
/// <reference path="../../../test/contexts/examples/Root.ts" />
/// <reference path="../../../test/contexts/examples/RootContext.ts" />
/// <reference path="../../../test/contexts/examples/Category.ts" />
/// <reference path="../../../test/contexts/examples/CategoryContext.ts" />
/// <reference path="../../../test/contexts/examples/Subject.ts" />
/// <reference path="../../../test/contexts/examples/SubjectContext.ts" />

module urls.examples {

    describe('SubjectSlug', () => {

        it('should return the correct url', () => {

            var root = new Root();
            var category = new Category();
            var subject = new Subject();
            
            var rootContext = new RootContext();
            var categoryContext = new CategoryContext(root, rootContext);
            var subjectContext = new SubjectContext(category, categoryContext);
            
            expect(subjectContext.getSingleUrl(subject.getId())).to.equal('/api/categories/second/subjects/4');
            expect(subjectContext.getAllUrl()).to.equal('/api/categories/second/subjects');
            
        });
    });
}
