/// <reference path="../definitions/mocha/mocha.d.ts" />
/// <reference path="../definitions/chai/chai.d.ts" />
/// <reference path="../definitions/sinon/sinon.d.ts" />
/// <reference path="../definitions/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../src/Dependency.ts" />
/// <reference path="../src/AnotherTest.ts" />

var expect = chai.expect;

describe("AnotherTest", () => {

	it("should have a property Henk", () => {

		var dependency = {methodToMock: sinon.stub()};
		dependency.methodToMock.returns('Pieterke');

        var anotherTest = new AnotherTest();
        anotherTest.henk = 'Veertig';

        expect(anotherTest.giveHenk()).to.equal('Veertig');

        anotherTest.useDependencyToSetHenk(dependency);
        expect(anotherTest.giveHenk()).to.equal('Pieterke');
        expect(dependency.methodToMock).to.have.been.called;
    });

});