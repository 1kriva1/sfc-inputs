import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { TextInputComponent } from '../../sfc-text-input/sfc-text-input.component';
import BaseInputComponent from './sfc-base-input.component';
import { StyleClass, CommonConstants } from '../constants/common-constants';

@Component({
    template: `<form>
                    <sfc-text-input name="text-input" ngModel maxlength="5"></sfc-text-input>
               </form>`
})
class TestTextInputInFormComponent {

    @ViewChild(TextInputComponent, { static: false })
    public textInputComponent: TextInputComponent;
}

describe('Component: BaseInputComponent', () => {

    let component: TestTextInputInFormComponent;
    let fixture: ComponentFixture<TestTextInputInFormComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let inputEl: any;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [TestTextInputInFormComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TestTextInputInFormComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            inputEl = fixture.nativeElement.querySelector('input');
            debugInputEl = el.query(By.css('input'));
            labelEl = fixture.nativeElement.querySelector('label');

            fixture.detectChanges();
        });
    }));

    it("Label class: class value - default", () => {
        expect(labelEl.className).toEqual('');
    });

    it("Label class: class value - active, when placeholder exist", () => {
        component.textInputComponent._placeholder = 'test placeholder';
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label class: class value - active, when input in focus", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label class: class value - active, when value defined", () => {
        component.textInputComponent.writeValue('test value');
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Icon class: should add class to icon element", () => {
        component.textInputComponent.icon = 'fa fa-user';
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("Icon class: when component is focused", () => {
        component.textInputComponent.icon = 'fa fa-user';
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Active);
    });

    it("Icon class: when component has validation class", () => {
        component.textInputComponent.icon = 'fa fa-user';
        const value = 'trigger input event';
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: value } });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Invalid);
    });

    it("Placeholder: value if value not defined", () => {
        expect(inputEl.placeholder).toEqual('');
    });

    it("Placeholder: with value", () => {
        const placeholderAssertValue = "test placeholder";
        component.textInputComponent._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual(placeholderAssertValue);
    });

    it("Placeholder: with value and focused", () => {
        const placeholderAssertValue = "test placeholder";
        component.textInputComponent._placeholder = placeholderAssertValue;
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual('');
    });

    it("Helper text: valid input with helper text value", () => {
        const helperTextAssertValue = 'test helper text';
        component.textInputComponent._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it("Helper text: invalid input with default validation message", () => {
        const helperTextAssertValue = 'test helper text',
            value = 'trigger input event';
        component.textInputComponent._helperText = helperTextAssertValue;
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: value } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.DEFAULT_ERROR_MESSAGE);
    });

    it("Helper text: invalid input with defined validation message", () => {
        const helperTextAssertValue = 'test helper text',
            value = 'trigger input event';
        component.textInputComponent._helperText = helperTextAssertValue;
        component.textInputComponent.validations = {maxlength: 'Max length is not valid'}
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: value } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Max length is not valid');
    });

    it("Helper text: invalid input with defined validation message that not found in validation object", () => {
        const helperTextAssertValue = 'test helper text',
            value = 'trigger input event';
        component.textInputComponent._helperText = helperTextAssertValue;
        component.textInputComponent.validations = {required: 'Max length is not valid'}
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: value } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.DEFAULT_ERROR_MESSAGE);
    });
});