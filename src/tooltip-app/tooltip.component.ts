import { Component } from '@angular/core';
import BaseAppInputComponent from 'src/base-app-input.component';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tooltip-app',
    templateUrl: './tooltip.component.html',
    styleUrls: [
        '../app/app.component.css',
        './tooltip.component.css'
    ]
})
export class ToolTipAppComponent extends BaseAppInputComponent {
    private customSize: any = { width: 80, height: 80 };

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }
}