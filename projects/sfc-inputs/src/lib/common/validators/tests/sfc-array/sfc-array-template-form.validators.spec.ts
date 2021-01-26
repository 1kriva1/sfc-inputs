import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../../../sfc-inputs.module';
import { MinLength } from '../../sfc-min-length.validator';
import { MaxLength } from '../../sfc-max-length.validator';

@Component({
    template: `
      <form>
        <sfc-tags-input id="tags-input" name="tags-input" ngModel [max-length]="3" [min-length]="1">
        </sfc-tags-input>
      </form>
    `
})
class ArrayValuesFormTemplateTestComponent {
}

describe('Validators: Array values - Template form', () => {

    let fixture: ComponentFixture<ArrayValuesFormTemplateTestComponent>;
    let el: DebugElement;
    let debugTagsInputEl: DebugElement;
    let form: NgForm;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [ArrayValuesFormTemplateTestComponent, MaxLength, MinLength],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ArrayValuesFormTemplateTestComponent);
            el = fixture.debugElement;

            fixture.detectChanges();

            debugTagsInputEl = el.query(By.css('input'));
            form = el.children[0].injector.get(NgForm);
        });
    }));

    it('MaxLength: validation failed', (() => {
        const templateFileInputControl = form.control.get('tags-input'),
            invalidValue = ['test1', 'test2', 'test3', 'test4'],
            expectedResult = { requiredLength: 3, actualLength: 4, value: invalidValue };

        debugTagsInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('maxLength')).toBeTruthy();
        expect(templateFileInputControl.errors['maxLength']).toEqual(expectedResult);
        expect(templateFileInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('MaxLength: validation success', (() => {
        const templateFileInputControl = form.control.get('tags-input'),
            invalidValue = ['test1', 'test2', 'test3'];

        debugTagsInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('maxLength')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('MaxLength: validation value is NULL', (() => {
        const templateFileInputControl = form.control.get('tags-input'),
            invalidValue = null;

        debugTagsInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('maxLength')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('MinLength: validation failed', (() => {
        const templateFileInputControl = form.control.get('tags-input'),
            invalidValue = [],
            expectedResult = { requiredLength: 1, actualLength: 0, value: invalidValue };

        debugTagsInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('minLength')).toBeTruthy();
        expect(templateFileInputControl.errors['minLength']).toEqual(expectedResult);
        expect(templateFileInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('MinLength: validation success', (() => {
        const templateFileInputControl = form.control.get('tags-input'),
            invalidValue = ['test1'];

        debugTagsInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('minLength')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('MinLength: validation value is NULL', (() => {
        const templateFileInputControl = form.control.get('tags-input'),
            invalidValue = null;

        debugTagsInputEl.componentInstance.ngControl.control.setValue(invalidValue);
        fixture.detectChanges();

        expect(templateFileInputControl.hasError('minLength')).toBeFalsy();
        expect(templateFileInputControl.errors).toBeNull();
        expect(templateFileInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));
});