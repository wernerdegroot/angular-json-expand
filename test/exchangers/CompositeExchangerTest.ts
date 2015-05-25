/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/CompositeExchanger.ts" />
/// <reference path="../../test/domainobjects/MockDomainObject.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module exchangers {

    import IQService = angular.IQService;
    import MockDomainObject = domainobjects.MockDomainObject;
    import DomainObject = domainobjects.DomainObject;

    describe('CompositeExchanger', () => {

        var firstExchanger;
        var secondExchanger;

        // Prepare JSON and domain object.
        var json = {
            jsonProperty: 'jsonValue'
        };
        
        var domainObject = new MockDomainObject();
        domainObject['domainObjectProperty'] = 'domainObjectValue';
        
        var parentDomainObject = new MockDomainObject();
        
        var q: IQService;

        beforeEach(inject(($q) => {
            firstExchanger = {
                fromJson: sinon.stub(),
                toJson: sinon.stub()
            };

            secondExchanger = {
                fromJson: sinon.stub(),
                toJson: sinon.stub()
            };

            q = $q;
        }));

        it('should call each Exchanger on a call to method fromJson', () => {

            var compositeExchanger: CompositeExchanger<DomainObject, DomainObject> = new CompositeExchanger<DomainObject, DomainObject>(q);
            compositeExchanger.add(firstExchanger);
            compositeExchanger.add(secondExchanger);

            compositeExchanger.fromJson(json, domainObject, 14, 'slug', parentDomainObject);

            expect(firstExchanger.fromJson.calledWith(json, domainObject, 14, 'slug', parentDomainObject)).to.be.ok;
            expect(secondExchanger.fromJson.calledWith(json, domainObject, 14, 'slug', parentDomainObject)).to.be.ok;

            expect(firstExchanger.toJson.called).to.not.be.ok;
            expect(secondExchanger.toJson.called).to.not.be.ok;
        });

        it('should call each Exchanger on a call to method toJson', () => {

            var compositeExchanger: CompositeExchanger<DomainObject, DomainObject> = new CompositeExchanger<DomainObject, DomainObject>(q);
            compositeExchanger.add(firstExchanger);
            compositeExchanger.add(secondExchanger);

            compositeExchanger.toJson(domainObject, json);

            expect(firstExchanger.fromJson.called).to.not.be.ok;
            expect(secondExchanger.fromJson.called).to.not.be.ok;

            expect(firstExchanger.toJson.calledWith(domainObject, json)).to.be.ok;
            expect(secondExchanger.toJson.calledWith(domainObject, json)).to.be.ok;
        });
    });
}
