export interface CountryOptions {
    id?: string;
    name?: string;
    code?: string;
}

export class Country {
    id?: string;
    name?: string;
    code?: string;

    constructor(options?: CountryOptions) {
        for (const k in options) {
            if (options.hasOwnProperty(k)) {
                if (options[k] === 'null') {
                    this[k] = '';
                } else {
                    this[k] = options[k];
                }
            }
        }
    }
}
