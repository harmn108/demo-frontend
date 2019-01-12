import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatIconModule, MatMenuModule, MatSnackBarModule,
    MatToolbarModule, MatTableModule, MatFormFieldModule, MatGridListModule,
    MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule
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
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatToolbarModule
    ],
    declarations: [
        ErrorPageComponent
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
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatToolbarModule
    ]
})
export class SharedModule {
}
