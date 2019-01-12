import { Injectable } from '@angular/core';
import { Country } from './models/country';
import { filter, map } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CountryService {

    allCountriesData = null;
    allCountriesDataChanged: Subject<Country[]> = new Subject<Country[]>();

    private countriesUrl = `${environment.backend}/api/v1/country`;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    getAll(): void {
        const url = this.countriesUrl + '/all';
        const apiKey = environment.x_api_token;
        try {
            let headers = new HttpHeaders();
            headers = headers.set('X-API-TOKEN', apiKey);
            this.http.get(url, {headers: headers})
                .pipe(filter(data => (data != null)))
                .pipe(map(data => {
                    const countriesList = [];
                    // @ts-ignore
                    if (data && data.result) {
                        // @ts-ignore
                        data.result.forEach(country => {
                            countriesList.push(new Country(country));
                        });
                        return countriesList;
                    }
                    return data;
                }))
                .subscribe((data: Country[]) => {
                    if (data) {
                        this.allCountriesData = data;
                        this.allCountriesDataChanged.next(this.allCountriesData);
                    }
                }, error => this.errorService.handleError('getAllCountries', error, url));
        } catch (Exeption) {
            this.errorService.handleError('getAllCountries', {'status': 404}, url);
        }
    }
}
