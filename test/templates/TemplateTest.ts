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
        var subjectStringValueProperty: string = 'subjectStringValue';
        var subjectNumberValueProperty: string = 'subjectNumberValue';

        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transfer values from JSON to new subject', () => {

            var json = {};
            json[jsonStringValueProperty] = stringValue;
            json[jsonNumberValueProperty] = numberValue;
            
            var emptySubject: Object = {};
            var subjectConstructor: () => Object = () => emptySubject;
            
            var templateFactory = new TemplateFactory(q);
            var template: Template<Object> = templateFactory.create(subjectConstructor)
                .add(new DefaultExchanger(q, jsonStringValueProperty, subjectStringValueProperty))
                .add(new DefaultExchanger(q, jsonNumberValueProperty, subjectNumberValueProperty));
                    
            var subjectPromise = template.fromJson(json);
            subjectPromise.then((subject: Object) => {
                // Subject should be identical to the emptySubject which
                // should both be enriched with exchanged data.
                expect(subject).to.equal(emptySubject);
                expect(subject[subjectStringValueProperty]).to.equal(stringValue);
                expect(subject[subjectNumberValueProperty]).to.equal(numberValue);
            });
        });
        
        it('should transfer values from subject to new JSON', () => {

            var subject = {};
            subject[subjectStringValueProperty] = stringValue;
            subject[subjectNumberValueProperty] = numberValue;
            
            var subjectConstructor = sinon.stub();
            
            var templateFactory = new TemplateFactory(q);
            var template: Template<Object> = templateFactory.create(subjectConstructor)
                .add(new DefaultExchanger(q, jsonStringValueProperty, subjectStringValueProperty))
                .add(new DefaultExchanger(q, jsonNumberValueProperty, subjectNumberValueProperty));
                    
            var jsonPromise = template.toJson(subject);
            jsonPromise.then((json: Object) => {
                expect(json[jsonStringValueProperty]).to.equal(stringValue);
                expect(json[jsonNumberValueProperty]).to.equal(numberValue);
            });
            
            expect(subjectConstructor.called).to.not.be.ok;
        });
    });
}
