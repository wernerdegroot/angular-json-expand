/// <reference path="../../src/dependencies.ts" />
/// <reference path="../../src/subjects/IdSubject.ts" />

module repositories {

    import IPromise = angular.IPromise;
    import IdSubject = subjects.IdSubject;

    export interface Repository<S, T extends IdSubject<any>> {

        getById(id: S): IPromise<T>;

    }
}
