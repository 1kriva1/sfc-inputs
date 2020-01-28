import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[file-min-size]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useValue: SfcValidators.FileMinSize }
    ]
})
export class FileMinSize {
}