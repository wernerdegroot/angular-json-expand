/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/converters/PipedConverter.ts" />

module converters {

    describe('PipedConverter', () => {

        it('should pipe output from first to second on calling method from', () => {

            var first = {
                from: sinon.stub(),
                to: sinon.stub()
            };
    		first.from.withArgs(true).returns(1);

            var second = {
                from: sinon.stub(),
                to: sinon.stub()
            };
            second.from.withArgs(1).returns("one");

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            expect(pipedConverter.from(true)).to.equal('one');
        });

        it('should pipe output from second to first on calling method to', () => {

            var first = {
                from: sinon.stub(),
                to: sinon.stub()
            };
    		first.to.withArgs(1).returns(true);

            var second = {
                from: sinon.stub(),
                to: sinon.stub()
            };
            second.to.withArgs('one').returns(1);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            expect(pipedConverter.to('one')).to.equal(true);
        });

    });
}
