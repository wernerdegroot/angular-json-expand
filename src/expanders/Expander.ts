module expanders {

    export interface Expander<T> {

        fromJson(from: Object, to: T): void;
        toJson(to: T, from: Object): void;

    }
}
