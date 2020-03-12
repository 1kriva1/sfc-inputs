import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TextAreaRequired } from '../sfc-text-area-required.validator';
import SfcValidators from '../sfc-input.validators';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { getHugeFile } from './sfc-input-validator-helper';
import { FileMaxSize } from '../sfc-file-max-size.validator';
import { FileMinSize } from '../sfc-file-min-size.validator';
import { FileExtensions } from '../sfc-file-extensions.validator';


@Component({
    template: `
      <form>
        <sfc-file-input id="file-input" name="file-input" ngModel [file-max-size]="1024" [file-min-size]="256" [file-extensions]="['jpg', 'jpeg']">
        </sfc-file-input>
      </form>
    `
})
class FileInputFormTemplateTestComponent {
}

describe('Validators: FileInput - Template form', () => {

    let fixture: ComponentFixture<FileInputFormTemplateTestComponent>;
    let el: DebugElement;
    let debugFileInputEl: DebugElement;
    let form: NgForm;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [FileInputFormTemplateTestComponent, FileMaxSize, FileMinSize, FileExtensions],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(FileInputFormTemplateTestComponent);
            el = fixture.debugElement;

            fixture.detectChanges();

            debugFileInputEl = el.query(By.css('input[type=file]'));
            form = el.children[0].injector.get(NgForm);
        });
    }));

    it('FileMaxSize: validation failed', (() => {
        const templateFileInputControl = form.control.get('file-input'),
            invalidValue = getHugeFile('testFile.jpg', 2048),
            expectedResult = { requiredSize: 1024, actualSize: 2048, file: invalidValue };

        debugFileInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('fileMaxSize')).toBeTruthy();
        expect(templateFileInputControl.errors['fileMaxSize']).toEqual(expectedResult);
        expect(templateFileInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('FileMaxSize: validation success', (() => {
        const templateFileInputControl = form.control.get('file-input'),
            validValue = getHugeFile('testFile.jpg', 512);

        debugFileInputEl.componentInstance.ngControl.control.setValue(validValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('fileMaxSize')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('FileMinSize: validation failed', (() => {
        const templateFileInputControl = form.control.get('file-input'),
            invalidValue = getHugeFile('testFile.jpg', 128),
            expectedResult = { requiredSize: 256, actualSize: 128, file: invalidValue };

        debugFileInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('fileMinSize')).toBeTruthy();
        expect(templateFileInputControl.errors['fileMinSize']).toEqual(expectedResult);
        expect(templateFileInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('FileMinSize: validation success', (() => {
        const templateFileInputControl = form.control.get('file-input'),
            validValue = getHugeFile('testFile.jpg', 512);

        debugFileInputEl.componentInstance.ngControl.control.setValue(validValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('fileMinSize')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('FileExtensions: validation failed', (() => {
        const templateFileInputControl = form.control.get('file-input'),
            allowedExtensions = ["jpg", "jpeg"],
            invalidValue = getHugeFile('testFile.png', 512),
            expectedResult = { allowedExtensions: allowedExtensions, actualExtension: 'png', file: invalidValue };

        debugFileInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('fileExtension')).toBeTruthy();
        expect(templateFileInputControl.errors['fileExtension']).toEqual(expectedResult);
        expect(templateFileInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('FileExtensions: validation success', (() => {
        const templateFileInputControl = form.control.get('file-input'),
            invalidValue = getHugeFile('testFile.jpg', 512);

        debugFileInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('fileExtension')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));
});