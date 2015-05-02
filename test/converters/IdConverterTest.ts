/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/converters/IdConverter.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import Repository = repositories.Repository;
    import IdSubject = subjects.IdSubject;

    describe('IdConverter', () => {

        // Mock a Subject.
        var subject = {
            id: 14
        };

        var repository;
        var q: IQService;
        var rootScope;

        beforeEach(inject(($q: IQService, $rootScope) => {

            // Mock a Repository.
            repository = {
                getById: sinon.stub()
            };
            repository.getById.withArgs(subject.id).returns(subject);

            // Services.
            q = $q;
            rootScope = $rootScope;
        }));

        afterEach(() => {
            rootScope.$digest();
        });

        it('should transform an id to a promise to a Subject by using a Repository', () => {

            var idConverter = new IdConverter<number, IdSubject<number>>(q, repository);

            var subjectPromise: IPromise<IdSubject<number>> = idConverter.from(subject.id);
            subjectPromise.then((subject: IdSubject<number>) => {
                expect(subject).to.equal(subject);
                expect(repository.getById.calledWith(subject.id)).to.be.ok;
            });
        });

        it('should transform a promise to an id to a promise to a Subject by using a Repository', () => {

            var idConverter = new IdConverter<number, IdSubject<number>>(q, repository);

            var subjectPromise = idConverter.from(q.when(subject.id));
            subjectPromise.then((subject: IdSubject<number>) => {
                expect(subject).to.equal(subject);
                expect(repository.getById.calledWith(subject.id)).to.be.ok;
            });
        });

        it('should transform a Subject to a promise to an id by using Subject\'s id', () => {

            var idConverter = new IdConverter<number, IdSubject<number>>(q, repository);

            var idPromise: IPromise<number> = idConverter.to(subject);
            idPromise.then((id: number) => {
                expect(id).to.equal(subject.id);
            });
        });

        it('should transform a promise to a Subject to a promise to an id by using Subject\'s id', () => {

            var idConverter = new IdConverter<number, IdSubject<number>>(q, repository);

            var idPromise: IPromise<number> = idConverter.to(q.when(subject));
            idPromise.then((id: number) => {
                expect(id).to.equal(subject.id);
            });
        });
    });
}
