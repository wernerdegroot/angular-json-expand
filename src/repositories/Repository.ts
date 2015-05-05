/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />
/// <reference path="../../src/contexts/Context.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import IdSubject = subjects.IdSubject;
    import Context = contexts.Context;

    export interface Repository<ID_TYPE, SUBJECT_TYPE extends IdSubject<any>> {

        getById(id: ID_TYPE, context: Context<ID_TYPE>): IPromise<SUBJECT_TYPE>;
        
        getAll(context: Context<ID_TYPE>): IPromise<SUBJECT_TYPE[]>;

    }
}
