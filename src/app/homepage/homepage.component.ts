import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    public searchForm: FormGroup;
    private errorMessages: string;

    constructor(
        private FormBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.buildForm();
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
        // this.formNotSubmited = false;
        // this.userService.resetPassword(this.resetForm.value);
    }
}
