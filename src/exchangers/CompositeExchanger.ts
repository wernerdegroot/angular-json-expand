/// <reference path="../../src/exchangers/Exchanger.ts" />

module exchangers {

    export class CompositeExchanger implements Exchanger {

        private exchangers: Exchanger[] = [];

        add(exchanger: Exchanger) {
            this.exchangers.push(exchanger);
        }

        fromJson(json: Object, subject: Object): void {
            this.exchangers.forEach((exchanger: Exchanger) => {
                exchanger.fromJson(json, subject);
            });
        }

        toJson(subject: Object, json: Object): void {
            this.exchangers.forEach((exchanger: Exchanger) => {
                exchanger.toJson(subject, json);
            });
        }
    }
}
