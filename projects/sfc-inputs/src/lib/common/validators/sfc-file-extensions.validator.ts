import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[file-extensions]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useValue: SfcValidators.FileExtensions }
    ]
})
export class FileExtensions {
}