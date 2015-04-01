/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/ConvertingExchanger.ts" />
/// <reference path="../../src/converters/Converter.ts" />

module exchangers {

    import Converter = converters.Converter;

    describe('ConvertingExchanger', () => {

        // Prepare values.
        var numberValue = 1;
        var stringValue = "one";

        // Prepare mock converter.
        var converter = {
            from: sinon.stub(),
            to: sinon.stub()
        };
        converter.from.withArgs(numberValue).returns(stringValue);
        converter.to.withArgs(stringValue).returns(numberValue);

        // Prepare keys.
        var jsonPropertyName = "jsonProperty";
        var subjectPropertyName = "subjectProperty";

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
            convertingExchanger.fromJson(json, subject);

            // Check that the property was exchanges successfully.
            expect(subject[subjectPropertyName]).to.equal(stringValue);

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
            convertingExchanger.toJson(subject, json);

            // Check that the property was exchanges successfully.
            expect(json[jsonPropertyName]).to.equal(numberValue);

        });
    });
}
