/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/ConvertingExchanger.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import Converter = converters.Converter;

    describe('ConvertingExchanger', () => {

        // Prepare values.
        var numberValue = 1;
        var stringValue = "one";

        // Prepare promises.
        var numberPromise: IPromise<number>;
        var stringPromise: IPromise<string>;

        // Prepare mock converter.
        var converter;

        // Prepare keys.
        var jsonPropertyName = "jsonProperty";
        var subjectPropertyName = "subjectProperty";

        var q: IQService;
        var rootScope;

        beforeEach(inject(($q: IQService, $rootScope) => {
            q = $q;
            rootScope = $rootScope;

            numberPromise = q.when(numberValue);
            stringPromise = q.when(stringValue);

            converter = {
               from: sinon.stub(),
               to: sinon.stub()
           };
           converter.from.withArgs(numberValue).returns(stringPromise);
           converter.to.withArgs(stringValue).returns(numberPromise);
        }));

        afterEach(() => {
            rootScope.$digest();
        })

        it('should call converter when transferring value from JSON to subject', () => {

            // Prepare JSON-object.
            var json = {};
            json[jsonPropertyName] = numberValue;

            // Prepare subject.
            var subject = {};

            // Exchange a property between a JSON-object and a subject.
            var convertingExchanger = new ConvertingExchanger<number, string>(
                converter,
                jsonPropertyName,
                subjectPropertyName
            );

            convertingExchanger.fromJson(json, subject).then(() => {
                // Check that the property was exchanged successfully.
                expect(subject[subjectPropertyName]).to.equal(stringValue);
            });
        });

        it('should call converter when transferring value from subject to JSON', () => {

            // Prepare JSON-object.
            var json = {};

            // Prepare subject.
            var subject = {};
            subject[subjectPropertyName] = stringValue;

            // Exchange a property between a JSON-object and a subject.
            var convertingExchanger = new ConvertingExchanger<number, string>(
                converter,
                jsonPropertyName,
                subjectPropertyName
            );

            convertingExchanger.toJson(subject, json).then(() => {
                // Check that the property was exchanged successfully.
                expect(json[jsonPropertyName]).to.equal(numberValue);
            });

        });
    });
}
