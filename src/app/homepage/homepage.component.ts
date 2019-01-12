import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Place } from '../services/models/place';
import { PlaceService } from '../services/place.service';
import { CountryService } from '../services/country.service';
import { Country } from '../services/models/country';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
    public loading = false;
    public searchForm: FormGroup;
    public countriesList: Country[] = [];
    public placesList: Place[];
    private ELEMENT_DATA: Place[] = [];
    public placesCount = 0;

    @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
        if (paginator) {
            this.dataSource.paginator = paginator;
        }
    }

    displayedColumns: string[] = ['name', 'latitude', 'longitude', 'zip_code', 'country'];
    dataSource = new MatTableDataSource<Place>(this.ELEMENT_DATA);
    public getAllCountriesSubscription: Subscription = Subscription.EMPTY;
    public placesListCountDataChangedSubscription: Subscription = Subscription.EMPTY;
    public placesByFilterDataChangedSubscription: Subscription = Subscription.EMPTY;

    constructor(
        private FormBuilder: FormBuilder,
        private placeService: PlaceService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private countryService: CountryService
    ) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.countryService.getAll();

            this.buildForm();

            this.getAllCountriesSubscription = this.countryService.allCountriesDataChanged.subscribe((countriesList: Country[]) => {
                if (countriesList) {
                    this.countriesList = countriesList;
                }
            });

            this.placesListCountDataChangedSubscription = this.placeService.placesListCountDataChanged.subscribe((count: number) => {
                this.placesCount = count;
            });

            this.placesByFilterDataChangedSubscription = this.placeService.placesByFilterDataChanged.subscribe((placesList: Place[]) => {
                if (placesList) {
                    this.placesList = placesList;
                    this.dataSource = new MatTableDataSource<Place>(placesList);
                    this.loading = false;
                }
            });
        }
    }

    private buildForm(): void {
        this.searchForm = this.FormBuilder.group({
            'country': new FormControl('', [Validators.required]),
            'zip_code': new FormControl('', [Validators.required]),
        });
    }

    public submit(): void {
        if (this.searchForm.invalid) {
            return;
        }

        this.loading = true;

        this.placeService.getPlacesByFilter(this.searchForm.value);
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.getAllCountriesSubscription.unsubscribe();
            this.placesListCountDataChangedSubscription.unsubscribe();
            this.placesByFilterDataChangedSubscription.unsubscribe();
        }
    }
}
