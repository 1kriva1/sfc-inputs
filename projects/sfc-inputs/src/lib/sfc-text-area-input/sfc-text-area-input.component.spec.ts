import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaInputComponent } from './sfc-text-area-input.component';
import { SfcInputsModule } from '../sfc-inputs.module';
import { CommonConstants } from '../common/constants/common-constants';

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

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain("icon");
        expect(icon.className).toContain("fa");
        expect(icon.className).toContain("fa-user");
    });

    it("TextArea: should create input element", () => {
        expect(textAreaEl).toBeDefined();
    });

    it("TextArea: default id value", () => {
        expect(textAreaEl.id).toEqual("sfc-");
    });

    it("TextArea: id value", () => {
        component.id = "test-id";
        fixture.detectChanges();

        expect(textAreaEl.id).toEqual("sfc-test-id");
    });

    it("TextArea: default type value", () => {
        expect(textAreaEl.type).toEqual("textarea");
    });

    it("TextArea: permanent class value", () => {
        expect(fixture.nativeElement.querySelector('input.input-text-input')).toBeDefined();
    });

    it("TextArea: placeholder value if value not defined", () => {
        expect(textAreaEl.placeholder).toEqual("");
    });

    it("TextArea: placeholder value", () => {
        const placeholderAssertValue = "test placeholder";
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual(placeholderAssertValue);
    });

    it("TextArea: default input value", () => {
        expect(textAreaEl.value).toEqual("");
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

        expect(labelEl.className).toEqual("active");
    });

    it("TextArea: focus event (placeholder)", () => {
        const placeholderAssertValue = "test placeholder";
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual(placeholderAssertValue);

        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(textAreaEl.placeholder).toEqual("");
    });

    it("TextArea: blur event", () => {
        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('blur', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual("");
    });

    it("TextArea: keydown space and than check keyup event", () => {
        const initialHeight = textAreaEl.clientHeight;
        debugTextAreaEl.triggerEventHandler('keydown.space', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('keyup', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(textAreaEl.style.height).toEqual(initialHeight + CommonConstants.CSS_PIXELS);
    });

    it("TextArea: remove line and than check keyup event", () => {
        const value = 'first line \n second line';
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('keyup', {
            target: debugTextAreaEl.nativeElement
        });
        fixture.detectChanges();

        const initialHeight = textAreaEl.clientHeight;

        debugTextAreaEl.nativeElement.value = "first line";
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        debugTextAreaEl.triggerEventHandler('keyup', {
            target: debugTextAreaEl.nativeElement
        });
        fixture.detectChanges();

        const resultHeight = textAreaEl.style.height.replace(CommonConstants.CSS_PIXELS, '');
        expect(resultHeight).toBeLessThan(initialHeight);
    });

    it("TextArea: add new line (press enter) and than check keyup event", () => {
        const initialHeight = textAreaEl.clientHeight;
        const value = '\n';
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        debugTextAreaEl.triggerEventHandler('keyup', {
            target: debugTextAreaEl.nativeElement
        });
        fixture.detectChanges();

        const resultHeight = textAreaEl.style.height.replace(CommonConstants.CSS_PIXELS, '');
        expect(resultHeight).toBeGreaterThan(initialHeight);
    });

    it("Label: default inner text value", () => {
        expect(labelEl.innerText).toEqual("");
    });

    it("Label: inner text value", () => {
        const labelAssertValue = "test label";
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
        component._placeholder = "test placeholder";
        fixture.detectChanges();

        expect(labelEl.className).toEqual("active");
    });

    it("Label: class value - active, when input in focus", () => {
        debugTextAreaEl.triggerEventHandler('focus', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual("active");
    });

    it("Label: class value - active, when value defined", () => {
        component.writeValue("test value");
        fixture.detectChanges();

        expect(labelEl.className).toEqual("active");
    });

    it("Helper text: should create element with permanent class value", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = "test helper text";
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it("Characters counter: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter')).toBeDefined();
    });

    it("Characters counter: check value with text", () => {
        const value = "first line \n";
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText)
            .toEqual("first line ".length.toString());
    });

    it("Characters counter: check value with new lines only", () => {
        const value = "\n\n\n";
        debugTextAreaEl.nativeElement.value = value;
        debugTextAreaEl.triggerEventHandler('input', { target: debugTextAreaEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText)
            .toEqual("");
    });
});