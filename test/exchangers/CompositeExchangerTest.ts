/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/exchangers/CompositeExchanger.ts" />

module exchangers {

    describe('CompositeExchanger', () => {

        var firstExchanger;
        var secondExchanger;

        var json = {
            jsonProperty: 'jsonValue'
        };
        var subject = {
            subjectProperty: 'subjectValue'
        }

        beforeEach(() => {
            firstExchanger = {
                fromJson: sinon.stub(),
                toJson: sinon.stub()
            };

            secondExchanger = {
                fromJson: sinon.stub(),
                toJson: sinon.stub()
            };
        });

        it('should call each Exchanger on a call to method fromJson', () => {

            var compositeExchanger: CompositeExchanger = new CompositeExchanger();
            compositeExchanger.add(firstExchanger);
            compositeExchanger.add(secondExchanger);

            compositeExchanger.fromJson(json, subject);

            expect(firstExchanger.fromJson.calledWith(json, subject)).to.be.ok;
            expect(secondExchanger.fromJson.calledWith(json, subject)).to.be.ok;

            expect(firstExchanger.toJson.called).to.not.be.ok;
            expect(secondExchanger.toJson.called).to.not.be.ok;
        });

        it('should call each Exchanger on a call to method toJson', () => {

            var compositeExchanger: CompositeExchanger = new CompositeExchanger();
            compositeExchanger.add(firstExchanger);
            compositeExchanger.add(secondExchanger);

            compositeExchanger.toJson(subject, json);

            expect(firstExchanger.fromJson.called).to.not.be.ok;
            expect(secondExchanger.fromJson.called).to.not.be.ok;

            expect(firstExchanger.toJson.calledWith(subject, json)).to.be.ok;
            expect(secondExchanger.toJson.calledWith(subject, json)).to.be.ok;
        });
    });
}
