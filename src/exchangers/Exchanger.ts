module exchangers {

    export interface Exchanger {

        fromJson(json: Object, subject: Object): void;
        toJson(subject: Object, json: Object): void;

    }
}
