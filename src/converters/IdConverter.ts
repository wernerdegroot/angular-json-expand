/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />

module converters {

    import IdSubject = subjects.IdSubject;
    import Repository = repositories.Repository;

    export class IdConverter<S, T extends IdSubject<any>> implements Converter<S, T> {

        constructor(private repository: Repository<S, T>) {

        }

        from(id: S): T {
            return this.repository.getById(id);
        }

        to(subject: T): S {
            return subject.id;
        }
    }
}
