/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/templates/Template.ts" />
/// <reference path="../../src/templates/TemplateFactory.ts" />

module templates {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    describe('Template', () => {

        var q: IQService;
        var rootScope;

        beforeEach(inject(($q: IQService, $rootScope) => {
            q = $q;
            rootScope = $rootScope;
        }));

        afterEach(() => {
            rootScope.$digest();
        })

        it('should transfer values from JSON to new subject', () => {

            var json = {
                stringValue: "one",
                numberValue: 1
            };
            
            var subject: Object = {};
            var subjectConstructor: () => Object = () => subject;
            
            var templateFactory = new TemplateFactory(q);
            var template: Template<Object> = templateFactory.create(subjectConstructor);
        });
    });
}
