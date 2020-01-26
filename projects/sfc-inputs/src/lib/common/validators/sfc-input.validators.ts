import { AbstractControl } from '@angular/forms';

export default class SfcValidators {
    static TextAreaRequired(control: AbstractControl){

        if(control.value === null || control.value === undefined){
            return { textAreaRequired: true };
        }

        const valueWithoutEscapeChars = control.value.replace(/\r?\n/g,"\\n").replace(/\\n/g, "");
    
        if (valueWithoutEscapeChars === '') {
            return { textAreaRequired: true };
        }
    
        return null;
    }
}