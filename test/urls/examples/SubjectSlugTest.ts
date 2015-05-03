/// <reference path="../../../test/test-dependencies.ts" />
/// <reference path="../../../src/urls/examples/Root.ts" />
/// <reference path="../../../src/urls/examples/RootSlug.ts" />
/// <reference path="../../../src/urls/examples/Category.ts" />
/// <reference path="../../../src/urls/examples/CategorySlug.ts" />
/// <reference path="../../../src/urls/examples/Subject.ts" />
/// <reference path="../../../src/urls/examples/SubjectContext.ts" />
/// <reference path="../../../src/urls/examples/SubjectSlug.ts" />

module urls.examples {

    describe('SubjectSlug', () => {

        it('should return the correct url', () => {

            var root = new Root();
            var category = new Category();
            var subject = new Subject();
            
            var subjectContext = new SubjectContext(root, category);
            
            var rootSlug = new RootSlug();
            var categorySlug = new CategorySlug(rootSlug);
            var subjectSlug = new SubjectSlug(categorySlug);
            
            expect(subjectSlug.getUrl(subject.getId(), subjectContext)).to.equal('/api/categories/second/subjects/4');
            
        });
    });
}
