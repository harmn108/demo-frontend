import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatIconModule, MatMenuModule, MatSnackBarModule,
    MatToolbarModule, MatCardModule, MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule,
    MatTableModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
    MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatSortModule,
    MatTabsModule, MatTooltipModule, MatNativeDateModule
} from '@angular/material';
import { PlaceService } from '../services/place.service';
import { ErrorService } from '../services/error.service';
import { CountryService } from '../services/country.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatCardModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTableModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatNativeDateModule,
    ],
    declarations: [
        ErrorPageComponent,
    ],
    providers: [
        PlaceService,
        ErrorService,
        CountryService
    ],
    exports: [
        ErrorPageComponent,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatCardModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTableModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatNativeDateModule,
    ]
})
export class SharedModule {
}
