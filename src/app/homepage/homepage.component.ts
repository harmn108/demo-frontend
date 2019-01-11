
import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';


@Component({
    selector: 'homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: []
})
export class HomepageComponent implements OnInit {


    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {

    }
}
