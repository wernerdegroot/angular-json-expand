module subjects {

    // This library relies on subjects having an id.
    // This interface is therefore used all over the place.
    export interface IdSubject<T> {
        id: T;
    }
}
