import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TextAreaRequired } from '../sfc-text-area-required.validator';
import SfcValidators from '../sfc-input.validators';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../../sfc-inputs.module';


@Component({
    template: `
      <form>
        <sfc-text-area-input name="text-area-input" label="First Name" ngModel text-area-required>
        </sfc-text-area-input>
      </form>
    `
})
class TextAreaFormTemplateTestComponent {
}

describe('Validators: TextArea - Template form', () => {

    let fixture: ComponentFixture<TextAreaFormTemplateTestComponent>;
    let el: DebugElement;
    let debugTextAreaEl: DebugElement;
    let textAreaEl: any;
    let form: NgForm;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [TextAreaFormTemplateTestComponent, TextAreaRequired],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TextAreaFormTemplateTestComponent);
            el = fixture.debugElement;
            textAreaEl = fixture.nativeElement.querySelector('textarea');
            debugTextAreaEl = el.query(By.css('textarea'));
            form = el.children[0].injector.get(NgForm);

            fixture.detectChanges();
        });
    }));

    it('TextAreaRequired: validation failed', (() => {
        const templateTextAreaControl = form.control.get('text-area-input');
        const invalidValue = '\n\n\n';
        textAreaEl.value = invalidValue;
        textAreaEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(templateTextAreaControl.hasError('textAreaRequired')).toBe(true);
        expect(templateTextAreaControl.valid).toBe(false);
        expect(form.control.valid).toEqual(false);
    }));

    it('TextAreaRequired: validation success', (() => {
        const templateTextAreaControl = form.control.get('text-area-input');
        const validValue = 'firstline \n second line';
        debugTextAreaEl.nativeElement.value = validValue;
        debugTextAreaEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(templateTextAreaControl.hasError('textAreaRequired')).toBe(false);
        expect(templateTextAreaControl.valid).toBe(true);
        expect(form.control.valid).toEqual(true);
    }));
});