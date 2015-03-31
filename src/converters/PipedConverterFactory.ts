/// <reference path="Converter.ts" />
/// <reference path="PipedConverter.ts" />

module converters {

    export class PipedConverterFactory {

        create<S, T, U>(first: Converter<S, T>, second: Converter<T, U>): Converter<S, U> {
            return new PipedConverter(first, second);
        }

    }
}
