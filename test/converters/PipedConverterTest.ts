/// <reference path="../test-dependencies.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/converters/PipedConverter.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;

    var stringValue: string = "one";
    var numberValue: number = 1;
    var booleanValue: boolean = true;
    var booleanPromise: IPromise<boolean>;
    var numberPromise: IPromise<number>;
    var stringPromise: IPromise<string>;

    var q: IQService;

    beforeEach(inject(($q: IQService) => {
        q = $q;

        booleanPromise = q.when(booleanValue);
        numberPromise = q.when(numberValue);
        stringPromise = q.when(stringValue);
    }));

    describe('PipedConverter', () => {

        it('should pipe output from first to second on calling method from', () => {

            var first = {
                from: sinon.stub(),
                to: sinon.stub()
            };
    		first.from.withArgs(booleanValue).returns(numberPromise);

            var second = {
                from: sinon.stub(),
                to: sinon.stub()
            };
            second.from.withArgs(numberPromise).returns(stringPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.from(true);
            promise.then((result: string) => {
                expect(result).to.equal(stringValue);
            });
        });

        it('should pipe output from second to first on calling method to', () => {

            var first = {
                from: sinon.stub(),
                to: sinon.stub()
            };
    		first.to.withArgs(numberPromise).returns(booleanPromise);

            var second = {
                from: sinon.stub(),
                to: sinon.stub()
            };
            second.to.withArgs(stringValue).returns(numberPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.to(stringValue);
            promise.then((result: boolean) => {
                expect(result).to.equal(true);
            });
        });

    });
}
