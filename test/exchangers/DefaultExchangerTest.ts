/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/DefaultExchanger.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />

module exchangers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import MockDomainObject = domainobjects.MockDomainObject;

    describe('DefaultExchanger', () => {

        // Prepare values.
        var value = "one";

        // Prepare keys.
        var jsonPropertyName = "jsonProperty";
        var domainObjectPropertyName = "domainObjectProperty";

        var q: IQService;
        var rootScope;
        var parentDomainObject;
        var url = 'http://localhost/resources/14';

        beforeEach(inject(($q: IQService, $rootScope) => {
            q = $q;
            rootScope = $rootScope;
            
            parentDomainObject = new MockDomainObject();
        }));

        afterEach(() => {
            rootScope.$digest();
        })

        it('should transfer value from JSON to domain object', () => {

            // Prepare JSON-object.
            var json = {};
            json[jsonPropertyName] = value;

            // Prepare domain object.
            var domainObject = new MockDomainObject();

            // Exchange a property between a JSON-object and a domain object.
            var defaultExchanger = new DefaultExchanger(
                q,
                jsonPropertyName,
                domainObjectPropertyName
            );

            defaultExchanger.fromJson(json, domainObject, url, parentDomainObject).then(() => {
                // Check that the property was exchanged successfully.
                expect(domainObject[domainObjectPropertyName]).to.equal(value);
            });
        });

        it('should transfer value from domain object to JSON', () => {

            // Prepare JSON-object.
            var json = {};

            // Prepare domain object.
            var domainObject = new MockDomainObject();
            domainObject[domainObjectPropertyName] = value;

            // Exchange a property between a JSON-object and a domain object.
            var defaultExchanger = new DefaultExchanger(
                q,
                jsonPropertyName,
                domainObjectPropertyName
            );

            defaultExchanger.toJson(domainObject, json).then(() => {
                // Check that the property was exchanged successfully.
                expect(json[jsonPropertyName]).to.equal(value);
            });

        });
    });
}
