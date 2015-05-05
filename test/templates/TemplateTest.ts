/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/templates/Template.ts" />
/// <reference path="../../src/templates/TemplateFactory.ts" />
/// <reference path="../../src/exchangers/DefaultExchanger.ts" />

module templates {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IRootScopeService = angular.IRootScopeService;
    import DefaultExchanger = exchangers.DefaultExchanger;

    describe('Template', () => {

        var q: IQService;
        var rootScope: IRootScopeService;
        
        var stringValue: string = 'one';
        var numberValue: number = 1;

        var jsonStringValueProperty: string = 'jsonStringValue';
        var jsonNumberValueProperty: string = 'jsonNumberValue';
        var domainObjectStringValueProperty: string = 'domainObjectStringValue';
        var domainObjectNumberValueProperty: string = 'domainObjectNumberValue';

        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transfer values from JSON to new domain object', () => {

            var json = {};
            json[jsonStringValueProperty] = stringValue;
            json[jsonNumberValueProperty] = numberValue;
            
            var emptyDomainObject: Object = {};
            var domainObjectConstructor: () => Object = () => emptyDomainObject;
            
            var templateFactory = new TemplateFactory(q);
            var template: Template<Object> = templateFactory.create(domainObjectConstructor)
                .add(new DefaultExchanger(q, jsonStringValueProperty, domainObjectStringValueProperty))
                .add(new DefaultExchanger(q, jsonNumberValueProperty, domainObjectNumberValueProperty));
                    
            var domainObjectPromise = template.fromJson(json);
            domainObjectPromise.then((domainObject: Object) => {
                // DomainObject should be identical to the emptyDomainObject which
                // should both be enriched with exchanged data.
                expect(domainObject).to.equal(emptyDomainObject);
                expect(domainObject[domainObjectStringValueProperty]).to.equal(stringValue);
                expect(domainObject[domainObjectNumberValueProperty]).to.equal(numberValue);
            });
        });
        
        it('should transfer values from domain object to new JSON', () => {

            var domainObject = {};
            domainObject[domainObjectStringValueProperty] = stringValue;
            domainObject[domainObjectNumberValueProperty] = numberValue;
            
            var domainObjectConstructor = sinon.stub();
            
            var templateFactory = new TemplateFactory(q);
            var template: Template<Object> = templateFactory.create(domainObjectConstructor)
                .add(new DefaultExchanger(q, jsonStringValueProperty, domainObjectStringValueProperty))
                .add(new DefaultExchanger(q, jsonNumberValueProperty, domainObjectNumberValueProperty));
                    
            var jsonPromise = template.toJson(domainObject);
            jsonPromise.then((json: Object) => {
                expect(json[jsonStringValueProperty]).to.equal(stringValue);
                expect(json[jsonNumberValueProperty]).to.equal(numberValue);
            });
            
            expect(domainObjectConstructor.called).to.not.be.ok;
        });
    });
}
