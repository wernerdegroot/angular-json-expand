/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/ConvertingExchanger.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import Converter = converters.Converter;
    import MockDomainObject = domainobjects.MockDomainObject;
    import DomainObject = domainobjects.DomainObject;

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
        var domainObjectPropertyName = "domainObjectProperty";

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

        it('should call converter when transferring value from JSON to domain object', () => {

            // Prepare JSON-object.
            var json = {};
            json[jsonPropertyName] = numberValue;

            // Prepare domain object.
            var domainObject = new MockDomainObject();
            
            // Prepare parent domain object.
            var parentDomainObject = new MockDomainObject();

            // Exchange a property between a JSON-object and a domain object.
            var convertingExchanger = new ConvertingExchanger<number, string, DomainObject, DomainObject>(
                converter,
                jsonPropertyName,
                domainObjectPropertyName
            );

            convertingExchanger.fromJson(json, domainObject, 'slug', parentDomainObject).then(() => {
                // Check that the property was exchanged successfully.
                expect(domainObject[domainObjectPropertyName]).to.equal(stringValue);
            });
        });

        it('should call converter when transferring value from domain object to JSON', () => {

            // Prepare JSON-object.
            var json = {};

            // Prepare domain object.
            var domainObject = new MockDomainObject();
            domainObject[domainObjectPropertyName] = stringValue;

            // Exchange a property between a JSON-object and a domain object.
            var convertingExchanger = new ConvertingExchanger<number, string, DomainObject, DomainObject>(
                converter,
                jsonPropertyName,
                domainObjectPropertyName
            );

            convertingExchanger.toJson(domainObject, json).then(() => {
                // Check that the property was exchanged successfully.
                expect(json[jsonPropertyName]).to.equal(numberValue);
            });

        });
    });
}
