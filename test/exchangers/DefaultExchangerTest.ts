/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/DefaultExchanger.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    describe('DefaultExchanger', () => {

        // Prepare values.
        var value = "one";

        // Prepare keys.
        var jsonPropertyName = "jsonProperty";
        var subjectPropertyName = "subjectProperty";

        var q: IQService;
        var rootScope;

        beforeEach(inject(($q: IQService, $rootScope) => {
            q = $q;
            rootScope = $rootScope;
        }));

        afterEach(() => {
            rootScope.$digest();
        })

        it('should transfer value from JSON to subject', () => {

            // Prepare JSON-object.
            var json = {};
            json[jsonPropertyName] = value;

            // Prepare subject.
            var subject = {};

            // Exchange a property between a JSON-object and a subject.
            var defaultExchanger = new DefaultExchanger(
                q,
                jsonPropertyName,
                subjectPropertyName
            );

            defaultExchanger.fromJson(json, subject).then(() => {
                // Check that the property was exchanged successfully.
                expect(subject[subjectPropertyName]).to.equal(value);
            });
        });

        it('should transfer value from subject to JSON', () => {

            // Prepare JSON-object.
            var json = {};

            // Prepare subject.
            var subject = {};
            subject[subjectPropertyName] = value;

            // Exchange a property between a JSON-object and a subject.
            var defaultExchanger = new DefaultExchanger(
                q,
                jsonPropertyName,
                subjectPropertyName
            );

            defaultExchanger.toJson(subject, json).then(() => {
                // Check that the property was exchanged successfully.
                expect(json[jsonPropertyName]).to.equal(value);
            });

        });
    });
}
