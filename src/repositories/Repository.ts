/// <reference path="../../src/subjects/IdSubject.ts" />

module repositories {

    import IdSubject = subjects.IdSubject;

    export interface Repository<S, T extends IdSubject<any>> {

        getById(id: S): T;

    }
}
