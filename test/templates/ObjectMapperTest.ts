/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/objectmappers/ObjectMapper.ts" />
/// <reference path="../../src/objectmappers/ObjectMapperFactory.ts" />
/// <reference path="../../src/exchangers/DefaultExchanger.ts" />
/// <reference path="../../src/dataservices/UrlBuilder.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />

module objectmappers {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IRootScopeService = angular.IRootScopeService;
    import DefaultExchanger = exchangers.DefaultExchanger;
    import UrlBuilder = dataservices.UrlBuilder;
    import MockDomainObject = domainobjects.MockDomainObject;
    import DomainObject = domainobjects.DomainObject;

    describe('ObjectMapper', () => {

        var q: IQService;
        var rootScope: IRootScopeService;
        
        var stringValue: string = 'one';
        var numberValue: number = 1;

        var jsonStringValueProperty: string = 'jsonStringValue';
        var jsonNumberValueProperty: string = 'jsonNumberValue';
        var domainObjectStringValueProperty: string = 'domainObjectStringValue';
        var domainObjectNumberValueProperty: string = 'domainObjectNumberValue';
        
        var parentDomainObject;
        var url = 'http://localhost/resources/14';
        
        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;
            
            // Mock parent domain object.
            parentDomainObject = new MockDomainObject();
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transfer values from JSON to new domain object', () => {

            var json = {};
            json[jsonStringValueProperty] = stringValue;
            json[jsonNumberValueProperty] = numberValue;
            
            var emptyDomainObject: DomainObject = new MockDomainObject();
            var domainObjectConstructor: () => DomainObject = () => emptyDomainObject;
            
            var objectMapperFactory = new ObjectMapperFactory(q);
            var objectMapper: ObjectMapper<DomainObject, DomainObject> = objectMapperFactory.create(domainObjectConstructor)
                .add(new DefaultExchanger(q, jsonStringValueProperty, domainObjectStringValueProperty))
                .add(new DefaultExchanger(q, jsonNumberValueProperty, domainObjectNumberValueProperty));
                    
            var domainObjectPromise = objectMapper.fromJson(json, url, parentDomainObject);
            domainObjectPromise.then((domainObject: Object) => {
                // DomainObject should be identical to the emptyDomainObject which
                // should both be enriched with exchanged data.
                expect(domainObject).to.equal(emptyDomainObject);
                expect(domainObject[domainObjectStringValueProperty]).to.equal(stringValue);
                expect(domainObject[domainObjectNumberValueProperty]).to.equal(numberValue);
            });
        });
        
        it('should transfer values from domain object to new JSON', () => {

            var domainObject: DomainObject = new MockDomainObject();
            domainObject[domainObjectStringValueProperty] = stringValue;
            domainObject[domainObjectNumberValueProperty] = numberValue;
            
            var domainObjectConstructor = sinon.stub();
            
            var objectMapperFactory = new ObjectMapperFactory(q);
            var objectMapper: ObjectMapper<DomainObject, DomainObject> = objectMapperFactory.create(domainObjectConstructor)
                .add(new DefaultExchanger(q, jsonStringValueProperty, domainObjectStringValueProperty))
                .add(new DefaultExchanger(q, jsonNumberValueProperty, domainObjectNumberValueProperty));
                    
            var jsonPromise = objectMapper.toJson(domainObject);
            jsonPromise.then((json: Object) => {
                expect(json[jsonStringValueProperty]).to.equal(stringValue);
                expect(json[jsonNumberValueProperty]).to.equal(numberValue);
            });
            
            expect(domainObjectConstructor.called).to.not.be.ok;
        });
    });
}
