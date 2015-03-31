module converters {

    export interface Converter<S, T> {

        from(s: S): T;
        to(t: T): S;
    }


}
