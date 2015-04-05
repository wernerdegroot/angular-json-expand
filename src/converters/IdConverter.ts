/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IdSubject = subjects.IdSubject;
    import Repository = repositories.Repository;

    export class IdConverter<S, T extends IdSubject<any>> implements Converter<S, T> {

        constructor(private $q: IQService, private repository: Repository<S, T>) {

        }

        from(id: IPromise<S>|S): IPromise<T> {
            var idPromise: IPromise<S> = this.$q.when(id);
            return idPromise.then((id: S) => this.repository.getById(id));
        }

        to(subject: IPromise<T>|T): IPromise<S> {
            var subjectPromise = this.$q.when(subject);
            return subjectPromise.then((subject: T) => subject.id)
        }
    }
}
