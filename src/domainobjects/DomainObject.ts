module domainobjects {

    // This library relies on domain objects having an id.
    export interface DomainObject<T> {
        id: T;
    }
}
