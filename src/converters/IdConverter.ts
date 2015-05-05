/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/repositories/Repository.ts" />
/// <reference path="../../src/converters/Converter.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />
/// <reference path="../../src/contexts/Context.ts" />
/// <reference path="../../src/templates/Template.ts" />

module converters {

    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IdSubject = subjects.IdSubject;
    import Repository = repositories.Repository;
    import Context = contexts.Context;
    import Template = templates.Template;

    // Converts between an id (of type ID_TYPE) and a subject with this id (which should
    // extend IdSubject<ID_TYPE>). It uses a Repository (with a corresponding Context and
    // Template) to do so. 
    export class IdConverter<ID_TYPE, SUBJECT_TYPE extends IdSubject<any>> implements Converter<ID_TYPE, SUBJECT_TYPE> {

        constructor(
            private $q: IQService, 
            private repository: Repository<ID_TYPE, SUBJECT_TYPE>,
            private context: Context<ID_TYPE>,
            private template: Template<SUBJECT_TYPE>) {
        }

        from(id: IPromise<ID_TYPE>|ID_TYPE): IPromise<SUBJECT_TYPE> {
            var idPromise: IPromise<ID_TYPE> = this.$q.when(id);
            return idPromise.then((id: ID_TYPE) => this.repository.getById(id, this.context, this.template));
        }

        to(subject: IPromise<SUBJECT_TYPE>|SUBJECT_TYPE): IPromise<ID_TYPE> {
            var subjectPromise = this.$q.when(subject);
            return subjectPromise.then((subject: SUBJECT_TYPE) => subject.id)
        }
    }
}
