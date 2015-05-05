/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/CompositeExchanger.ts" />

module exchangers {

    import IQService = angular.IQService;

    describe('CompositeExchanger', () => {

        var firstExchanger;
        var secondExchanger;

        // Prepare JSON and domain object.
        var json = {
            jsonProperty: 'jsonValue'
        };
        
        var domainObject = {
            domainObjectProperty: 'domainObjectValue'
        }

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

            var compositeExchanger: CompositeExchanger = new CompositeExchanger(q);
            compositeExchanger.add(firstExchanger);
            compositeExchanger.add(secondExchanger);

            compositeExchanger.fromJson(json, domainObject);

            expect(firstExchanger.fromJson.calledWith(json, domainObject)).to.be.ok;
            expect(secondExchanger.fromJson.calledWith(json, domainObject)).to.be.ok;

            expect(firstExchanger.toJson.called).to.not.be.ok;
            expect(secondExchanger.toJson.called).to.not.be.ok;
        });

        it('should call each Exchanger on a call to method toJson', () => {

            var compositeExchanger: CompositeExchanger = new CompositeExchanger(q);
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
