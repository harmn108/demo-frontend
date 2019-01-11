import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorService } from './error.service';
import { filter, map } from 'rxjs/operators';
import { Place } from './models/place';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlaceService {

    placesByFilterData = null;
    placesByFilterDataChanged: Subject<Place[]> = new Subject<Place[]>();

    placesListCountData = 0;
    placesListCountDataChanged: Subject<number> = new Subject<number>()

    private placesUrl = `${environment.backend}/api/v1/place`;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    getPlacesByFilter(requestData = {}): void {
        console.log(requestData);
        const parameters = requestData ? JSON.stringify(requestData) : '{}';
        const url = this.placesUrl + '/get-by-filter/' + parameters;
        try {
            this.http.get(url)
            .pipe(filter(data => (data != null)))
            .pipe(map(data => {

                /// mock data
                let result = [{'name' : 'test', 'latitude' : '34534.45', 'longitude' : '567567.65'}];
                data = {'result': result, 'count': 1};
                ///

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
