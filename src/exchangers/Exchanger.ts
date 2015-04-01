module expanders {

    export interface Exchanger<T> {

        fromJson(from: Object, to: T): void;
        toJson(to: T, from: Object): void;

    }
}
