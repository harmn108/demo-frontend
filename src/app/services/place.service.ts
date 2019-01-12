import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorService } from './error.service';
import { filter, map } from 'rxjs/operators';
import { Place } from './models/place';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PlaceService {

    placesByFilterData = null;
    placesByFilterDataChanged: Subject<Place[]> = new Subject<Place[]>();

    placesListCountData = 0;
    placesListCountDataChanged: Subject<number> = new Subject<number>();

    private placesUrl = `${environment.backend}/api/v1/place`;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    getPlacesByFilter(requestData = {}): void {
        const apiKey = environment.x_api_token;
        let headers = new HttpHeaders();
        headers = headers.set('X-API-TOKEN', apiKey);
        const parameters = requestData ? JSON.stringify(requestData) : '{}';
        const url = this.placesUrl + '/get-by-filter/' + parameters;
        try {
            this.http.get(url, {headers: headers})
            .pipe(filter(data => (data != null)))
            .pipe(map(data => {
                const placesList = [];
                // @ts-ignore
                if (data && data.result) {
                    // @ts-ignore
                    data.result.forEach(place => {
                        placesList.push(new Place(place));
                    });

                    // @ts-ignore
                    this.placesListCountData = data.count;
                    this.placesListCountDataChanged.next(this.placesListCountData);

                    return placesList;
                }
                return data;
            }))
            .subscribe((data: Place[]) => {
                if (data) {
                    this.placesByFilterData = data;
                    this.placesByFilterDataChanged.next(this.placesByFilterData);
                }
            }, error => this.errorService.handleError('getPlacesByFilter', error, url));
        } catch (Exeption) {
            this.errorService.handleError('getPlacesByFilter', {'status': 404}, url);
        }
    }
}
