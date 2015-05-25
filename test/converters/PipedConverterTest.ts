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
    var rejectedBooleanPromise: IPromise<boolean>;
    var numberPromise: IPromise<number>;
    var rejectedNumberPromise: IPromise<number>;
    var stringPromise: IPromise<string>;
    var rejectedStringPromise: IPromise<string>;

    var q: IQService;
    var rootScope;
    
    var first;
    var second;

    describe('PipedConverter', () => {
        
        beforeEach(inject(($q: IQService, $rootScope) => {
            q = $q;
            rootScope = $rootScope;
    
            booleanPromise = q.when(booleanValue);
            numberPromise = q.when(numberValue);
            stringPromise = q.when(stringValue);
            
            rejectedBooleanPromise = q.reject();
            rejectedNumberPromise = q.reject();
            rejectedStringPromise = q.reject();
            
            first = {
                from: sinon.stub(),
                to: sinon.stub()
            };
            
            second = {
                from: sinon.stub(),
                to: sinon.stub()
            };
        }));
    
        afterEach(() => {
            rootScope.$digest();
        });

        it('should pipe output from first to second on calling method from', () => {

            first.from.withArgs(booleanValue).returns(numberPromise);
            second.from.withArgs(numberPromise).returns(stringPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.from(true);
            promise.then((result: string) => {
                expect(result).to.equal(stringValue);
            });
        });
        
        it('should return a rejected promise when the first converter returns a rejected promise when calling from', () => {

            first.from.withArgs(booleanValue).returns(rejectedNumberPromise);
            second.from.withArgs(rejectedNumberPromise).returns(rejectedStringPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.from(true);
            expect(promise).to.be.rejected;
        });
        
        it('should return a rejected promise when the second converter returns a rejected promise when calling from', () => {

            first.from.withArgs(booleanValue).returns(numberPromise);
            second.from.withArgs(numberPromise).returns(rejectedStringPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.from(true);
            expect(promise).to.be.rejected;
        });

        it('should pipe output from second to first on calling method to', () => {

    		first.to.withArgs(numberPromise).returns(booleanPromise);
            second.to.withArgs(stringValue).returns(numberPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.to(stringValue);
            promise.then((result: boolean) => {
                expect(result).to.equal(true);
            });
        });
        
        it('should return a rejected promise when the second converter returns a rejected promise when calling to', () => {

       		first.to.withArgs(rejectedNumberPromise).returns(rejectedBooleanPromise);
            second.to.withArgs(stringValue).returns(rejectedNumberPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.to(stringValue);
            expect(promise).to.be.rejected;
        });
        
        it('should return a rejected promise when the first converter returns a rejected promise when calling to', () => {

    		first.to.withArgs(numberPromise).returns(rejectedBooleanPromise);
            second.to.withArgs(stringValue).returns(numberPromise);

            var pipedConverter: Converter<boolean, string>
                    = new PipedConverter(first, second);

            var promise = pipedConverter.to(stringValue);
            expect(promise).to.be.rejected;
        });

    });
}
