import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonUtils } from 'projects/sfc-inputs/src/lib/common/utils/common-utils';

export default abstract class BaseAppInputComponent {
    protected customInputForm: FormGroup;
    protected theme: string;

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = CommonUtils.isDefined(params.theme) ? params.theme : "common";
        });
    }

    protected changeTheme(newTheme: string){
        this.router.navigate([], {
            queryParams: {theme: newTheme},
            relativeTo: this.activatedRoute
        });
    }
}