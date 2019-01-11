import { EventEmitter, Injectable, isDevMode } from '@angular/core';

export interface ErrorEventOptions {
    action?: string;
    message?: string;
    url?: string;
}
export class ErrorEvent {
    action?: string;
    message?: string;
    url?: string;

    constructor(options: ErrorEventOptions) {
        if (options.action) {
            this.action = options.action;
        }
        if (options.message) {
            this.message = options.message;
        }
        if (options.url) {
            this.url = options.url;
        }
    }
}

@Injectable()
export class ErrorService {

    private ErrorMessage = {
        default: 'Something went wrong',
        system_error: 'System error. Please try again later',
        not_found: 'The requested action was not found on this server'
    };

    public errorEventEmiter: EventEmitter<any> = new EventEmitter(true);

    constructor() {
    }

    getError(key) {
        return this.ErrorMessage[key] ? this.ErrorMessage[key] : this.ErrorMessage['default'];
    }

    public handleError(action: string, error: any, url = '') {
        let errorMessage = '';
        if (error.error && error.error.message) {
            errorMessage = error.error.message;
        } else if (error.error) {
            errorMessage = error.error;
        } else if (error) {
            errorMessage = error;
        } else {
            errorMessage = 'not_found';
        }

        if (isDevMode()) {
            console.log(action, errorMessage, error.status, url);
        }
        let key = '';
        if (error) {
            if (error.status === 404) {
                key = 'not_found';
            } else if (error.status === 409) {
                key = errorMessage;
            } else if (error.status === 400 || error.status === 401) {
                key = errorMessage;
            } else {
                key = 'default';
            }
        }
        let message = this.getError(key);

        if (error.status === 409 && !key.includes('_')) {
            message = errorMessage;
        } else if (error.status === 400 || error.status === 401) {
            message = errorMessage;
        }

        const errorEvent = new ErrorEvent({action: action, message: message, url: url});

        this.errorEventEmiter.emit(errorEvent);
    }

}
