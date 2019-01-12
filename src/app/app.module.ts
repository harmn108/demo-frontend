import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule, MatProgressSpinnerModule, MatCardModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '@angular/cdk/layout';
import {TemplateComponent} from './template/template.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {TransferHttpCacheModule} from "@nguniversal/common";

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'explorer-app'}),
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        TransferHttpCacheModule,
        SharedModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        LayoutModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        TemplateComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}

