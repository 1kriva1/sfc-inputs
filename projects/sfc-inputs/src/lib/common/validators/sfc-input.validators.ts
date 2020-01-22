import { AbstractControl } from '@angular/forms';

export default class SfcValidators {
    static TextAreaRequired(control: AbstractControl){

        const valueWithoutEscapeChars = control.value.replace(/\r?\n/g,"\\n").replace(/\\n/g, "");
    
        if (valueWithoutEscapeChars === '') {
            return { textAreaRequired: true };
        }
    
        return null;
    }
}