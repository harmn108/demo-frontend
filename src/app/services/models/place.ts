export interface PlaceOptions {
    name?: string;
    latitude?: string;
    longitude?: string;
}

export class Place {
    name?: string;
    latitude?: string;
    longitude?: string;

    constructor(options?: PlaceOptions) {
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
