/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/converters/CollectionConverter.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/domainobjects/DomainObject.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IRootScopeService = angular.IRootScopeService;

    describe('CollectionConverter', () => {

        var firstNumber: number = 1;
		var secondNumber: number = 2;
		var firstString: string = "one";
		var secondString: string = "two";
		
		var q: IQService;
		var rootScope: IRootScopeService;
		var converter;
		var failingConverter;

        beforeEach(inject(($q: IQService, $rootScope: IRootScopeService) => {
            q = $q;
            rootScope = $rootScope;
            
            // Mock a converter.
			converter = {
				from: sinon.stub(),
				to: sinon.stub()
			};
			converter.from.withArgs(firstNumber).returns(q.when(firstString));
			converter.from.withArgs(secondNumber).returns(q.when(secondString));
			converter.to.withArgs(firstString).returns(q.when(firstNumber));
			converter.to.withArgs(secondString).returns(q.when(secondNumber));
			
			// Mock a failing converter.
			failingConverter = {
				from: sinon.stub(),
				to: sinon.stub()
			};
			failingConverter.from.withArgs(firstNumber).returns(q.when(firstString));
			failingConverter.from.withArgs(secondNumber).returns(q.reject());
			failingConverter.to.withArgs(firstString).returns(q.when(firstNumber));
			failingConverter.to.withArgs(secondString).returns(q.reject());
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transform an collection of numbers into a promise to a collection of strings by using another converter', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, converter);
			var stringCollectionPromise = collectionConverter.from([firstNumber, secondNumber]);
			stringCollectionPromise.then((converted: string[]) => {
				expect(converted[0]).to.equal(firstString);
				expect(converted[1]).to.equal(secondString);
			});
        });
		
		it('should transform a promise to a collection of numbers into a promise to a collection of strings by using another converter', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, converter);
			var stringCollectionPromise = collectionConverter.from(q.when([firstNumber, secondNumber]));
			stringCollectionPromise.then((converted: string[]) => {
				expect(converted[0]).to.equal(firstString);
				expect(converted[1]).to.equal(secondString);
			});
        });
		
		it('should transform a rejected promise to a collection of numbers into a rejected promise', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, converter);
			var stringCollectionPromise = collectionConverter.from(q.reject());
			expect(stringCollectionPromise).to.be.rejected;
        });
		
		it('should transform a collection of numbers into a rejected promise when the passed converter returns a rejected promise', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, failingConverter);
			var stringCollectionPromise = collectionConverter.from([firstNumber, secondNumber]);
			expect(stringCollectionPromise).to.be.rejected;
        });
		
		it('should transform a collection of strings into a promise to a collection of numbers by using another converter', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, converter);
			var numberCollectionPromise = collectionConverter.to([firstString, secondString]);
			numberCollectionPromise.then((converted: number[]) => {
				expect(converted[0]).to.equal(firstNumber);
				expect(converted[1]).to.equal(secondNumber);
			});
        });
		
		it('should transform a promise to a collection of strings into a promise to a collection of numbers by using another converter', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, converter);
			var numberCollectionPromise = collectionConverter.to(q.when([firstString, secondString]));
			numberCollectionPromise.then((converted: number[]) => {
				expect(converted[0]).to.equal(firstNumber);
				expect(converted[1]).to.equal(secondNumber);
			});
        });
		
		it('should transform a rejected promise to a collection of strings into a rejected promise', () => {

            var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, converter);
			var numberCollectionPromise = collectionConverter.to(q.reject());
			numberCollectionPromise.then((converted: number[]) => {
				expect(converted[0]).to.equal(firstNumber);
				expect(converted[1]).to.equal(secondNumber);
			});
        });
		
		it('should transform a collection of strings into a rejected promise when the passed converter returns a rejected promise', () => {
			
			var collectionConverter: CollectionConverter<number, string> = new CollectionConverter<number, string>(q, failingConverter);
			var numberCollectionPromise = collectionConverter.to([firstString, secondString]);
			expect(numberCollectionPromise).to.be.rejected;
		});
    });
}
