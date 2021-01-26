import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaInputComponent } from './sfc-text-area-input.component';
import { SfcInputsModule } from '../sfc-inputs.module';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import { UIUtils } from '../common/utils/ui-utils';

describe('Component: TextAreaInputComponent', () => {

    let component: TextAreaInputComponent;
    let fixture: ComponentFixture<TextAreaInputComponent>;
    let el: DebugElement;
    let debugTextAreaEl: DebugElement;
    let textAreaEl: any;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TextAreaInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            textAreaEl = fixture.nativeElement.querySelector('textarea');
            debugTextAreaEl = el.query(By.css('textarea'));
            labelEl = fixture.nativeElement.querySelector('label');

            fixture.detectChanges();
        });
    }));

    it("TextAreaInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("Icon: when component is focused", () => {
        component.icon = 'fa fa-user';
        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Active);
    });

    it("TextArea: should create input element", () => {
        expect(textAreaEl).toBeDefined();
    });

    it("TextArea: default id value", () => {
        expect(textAreaEl.id).toEqual('sfc-');
    });

    it("TextArea: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(textAreaEl.id).toEqual('sfc-test-id');
    });

    it("TextArea: default type value", () => {
        expect(textAreaEl.type).toEqual('textarea');
    });

    it("TextArea: permanent class value", () => {
        expect(fixture.nativeElement.querySelector('input.input-text-input')).toBeDefined();
    });

    it("TextArea: placeholder value if value not defined", () => {
        expect(textAreaEl.placeholder).toEqual('');
    });

    it("TextArea: placeholder value", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual(placeholderAssertValue);
    });

    it("TextArea: placeholder with value and focused", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        debugTextAreaEl.triggerEventHandler('focus', { target: textAreaEl.nativeElement });
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual('');
    });

    it("TextArea: default input value", () => {
        expect(textAreaEl.value).toEqual('');
    });

    it("TextArea: set input value", () => {
        const assertValue = "test value";
        component.writeValue(assertValue);
        fixture.detectChanges();

        expect(textAreaEl.value).toEqual(assertValue);
    });

    it("TextArea: disabled default value", () => {
        expect(textAreaEl.disabled).toBeFalsy();
    });

    it("TextArea: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(textAreaEl.disabled).toBeTruthy();
    });

    it("TextArea: change event", () => {
        const value = 'trigger input event';
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(textAreaEl.value).toEqual(value);
    });

    it("TextArea: focus event (label)", () => {
        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("TextArea: focus event (placeholder)", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual(placeholderAssertValue);

        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual('');
    });

    it("TextArea: blur event", () => {
        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('blur', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual('');
    });

    it("TextArea: keydown space and than check keyup event", () => {
        const initialHeight = textAreaEl.clientHeight;
        debugTextAreaEl.triggerEventHandler('keydown.space', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('keyup', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(textAreaEl.style.height).toEqual(UIUtils.getCssLikePx(initialHeight));
    });

    it("TextArea: add new word", () => {
        inputWithKeyUp('first word', 68);
        const initialHeight = textAreaEl.clientHeight;
        inputWithKeyUp('second word', 68);
        const resultHeight = UIUtils.getValueFromCssLikePx(textAreaEl.style.height);

        expect(resultHeight).toEqual(initialHeight);
    });

    it("TextArea: remove line (press backspace) and than check keyup event", () => {
        inputWithKeyUp('first line \n', CommonConstants.ENTER_KEY_CODE);
        const initialHeight = textAreaEl.clientHeight;
        inputWithKeyUp('first line', CommonConstants.BACKSPACE_KEY_CODE);
        const resultHeight = UIUtils.getValueFromCssLikePx(textAreaEl.style.height);

        expect(resultHeight).toBeLessThan(initialHeight);
    });

    it("TextArea: add new line (press enter) and than check keyup event", () => {
        const initialHeight = textAreaEl.clientHeight;
        inputWithKeyUp('\n', CommonConstants.ENTER_KEY_CODE);
        const resultHeight = UIUtils.getValueFromCssLikePx(textAreaEl.style.height);

        expect(resultHeight).toBeGreaterThan(initialHeight);
    });

    it("Label: default inner text value", () => {
        expect(labelEl.innerText).toEqual('');
    });

    it("Label: inner text value", () => {
        const labelAssertValue = 'test label';
        component.label = labelAssertValue;
        fixture.detectChanges();

        expect(labelEl.innerText).toEqual(labelAssertValue);
    });

    it("Label: label should be linked to input element", () => {
        expect(textAreaEl.labels).toBeDefined();
        expect(textAreaEl.labels.length).toEqual(1);
        expect(textAreaEl.labels[0].htmlFor).toEqual(textAreaEl.id);
    });

    it("Label: class value - active, when placeholder exist", () => {
        component._placeholder = 'test placeholder';
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when input in focus", () => {
        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when value defined", () => {
        component.writeValue("test value");
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Helper text: should create element with permanent class value", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it("Characters counter: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter')).toBeDefined();
    });

    it("Characters counter: check value with empty value", () => {
        const value = null;
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText)
            .toEqual('');
    });

    it("Characters counter: check value with text", () => {
        const value = 'first line \n';
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText)
            .toEqual(value.length.toString());
    });

    // TODO: think about new line values
    xit("Characters counter: check value with new lines only", () => {
        const value = '\n\n\n';
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText)
            .toEqual("");
    });

    /* Private methods */

    function inputWithKeyUp(value: string, keyCode: number){
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('keyup', {
            target: debugTextAreaEl.nativeElement,
            keyCode: keyCode
        });
        fixture.detectChanges();
    }

    /* Private methods END */
});