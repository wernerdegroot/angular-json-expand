/// <reference path="../../test/test-dependencies.ts" />
/// <reference path="../../src/converters/IdConverter.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />

module converters {

    import Repository = repositories.Repository;
    import IdSubject = subjects.IdSubject;

    describe('IdConverter', () => {

        // Mock a Subject.
        var subject = {
            id: 14
        };

        var repository;

        beforeEach(() => {

            // Mock a Repository.
            repository = {
                getById: sinon.stub()
            }
            repository.getById.withArgs(subject.id).returns(subject);
        });

        it('should transform an id to a Subject by using a Repository', () => {

            var idConverter = new IdConverter<number, IdSubject<number>>(repository);

            expect(idConverter.from(subject.id)).to.equal(subject);
            expect(repository.getById.calledWith(subject.id)).to.be.ok;

        });

        it('should transform a Subject to an id by using Subject\'s id', () => {

            var idConverter = new IdConverter<number, IdSubject<number>>(repository);

            expect(idConverter.to(subject)).to.equal(subject.id);
        });
    });
}
