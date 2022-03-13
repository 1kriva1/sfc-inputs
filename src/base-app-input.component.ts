import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export default abstract class BaseAppInputComponent {
    public customInputForm: FormGroup;
    public theme: string;

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params.theme ? params.theme : "common";
        });
    }

    public changeTheme(newTheme: string){
        this.router.navigate([], {
            queryParams: {theme: newTheme},
            relativeTo: this.activatedRoute
        });
    }
}