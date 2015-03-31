/// <reference path="Converter.ts" />

module converters {

    export class PipedConverter<S, T, U> implements Converter<S, U> {

        private first: Converter<S, T>;
        private second: Converter<T, U>;

        constructor(first: Converter<S, T>, second: Converter<T, U>) {
            this.first = first;
            this.second = second;
        }

        from(s: S): U {
            var t: T = this.first.from(s);
            return this.second.from(t);
        }

        to(u: U): S {
            var t: T = this.second.to(u);
            return this.first.to(t);
        }

    }

}
