import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[file-max-size]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useValue: SfcValidators.FileMaxSize }
    ]
})
export class FileMaxSize {
}