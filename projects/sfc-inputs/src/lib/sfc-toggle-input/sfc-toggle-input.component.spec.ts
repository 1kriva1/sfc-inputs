import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { ToggleInputComponent } from './sfc-toggle-input.component';

describe('Component: ToggleInputComponent', () => {

    let component: ToggleInputComponent;
    let fixture: ComponentFixture<ToggleInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let debugLabelMainEl: DebugElement;
    let debugLabelAfterEl: DebugElement;
    let inputEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ToggleInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            inputEl = fixture.nativeElement.querySelector('input[type=checkbox].sfc-input');
            debugInputEl = el.query(By.css('input[type=checkbox].sfc-input'));
            debugLabelMainEl = el.query(By.css('input[type=checkbox].sfc-input ~ label.main-label'));
            debugLabelAfterEl = el.query(By.css('input[type=checkbox].sfc-input ~ label.display-label.after-label'));

            fixture.detectChanges();
        });
    }));

    it("ToggleInputComponent: Should create component", async(() => {
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

    it("Input: should create input element", () => {
        expect(inputEl).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(inputEl.id).toEqual('sfc-');
    });

    it("Input: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(inputEl.id).toEqual('sfc-test-id');
    });

    it("Input: checkbox type", () => {
        expect(inputEl.type).toEqual('checkbox');
    });

    it("Input: permanent class value", () => {
        expect(fixture.nativeElement.querySelector('input[type=checkbox].sfc-input')).toBeDefined();
    });

    it("Input: default input value", () => {
        expect(inputEl.value).toEqual('false');
    });

    it("Input: set input value", () => {
        component.writeValue(true);
        fixture.detectChanges();

        expect(inputEl.value).toEqual('true');
    });

    it("Input: disabled default value", () => {
        expect(inputEl.disabled).toBeFalsy();
    });

    it("Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(inputEl.disabled).toBeTruthy();
    });

    it("Input: change event", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, checked: true } });
        fixture.detectChanges();

        expect(inputEl.value).toEqual('true');
        expect(inputEl.checked).toEqual(true);
    });

    it("Label (before): without label config", () => {
        const debugLabelBeforeEl = el.query(By.css('input[type=checkbox].sfc-input ~ label.display-label.before-label'));
        expect(debugLabelBeforeEl).toBeNull();
    });

    it("Label (before): with label config", () => {
        component.labelConfig = { negativeLabel: '', positiveLabel: 'positive value' };
        fixture.detectChanges();

        const debugLabelBeforeEl = el.query(By.css('input[type=checkbox].sfc-input ~ label.display-label.before-label'));

        expect(debugLabelBeforeEl.nativeElement).toBeDefined();
    });

    it("Label (before): display value with defined negative value from config", () => {
        const assertValue = 'test display value';
        component.labelConfig = { negativeLabel: assertValue, positiveLabel: '' };
        fixture.detectChanges();

        const debugLabelBeforeEl = el.query(By.css('input[type=checkbox].sfc-input ~ label.display-label.before-label'));

        expect(debugLabelBeforeEl.nativeElement.innerText).toEqual(assertValue);
    });

    it("Label (after): display value without placeholder and label and label config", () => {
        expect(debugLabelAfterEl.nativeElement.innerText).toEqual('');
    });

    it("Label (after): display value with defined placeholder", () => {
        const assertValue = 'test display value';
        component._placeholder = assertValue;
        fixture.detectChanges();

        expect(debugLabelAfterEl.nativeElement.innerText).toEqual(assertValue);
    });

    it("Label (after): display value with defined label", () => {
        const assertValue = 'test display value';
        component.label = assertValue;
        fixture.detectChanges();

        expect(debugLabelAfterEl.nativeElement.innerText).toEqual(assertValue);
    });

    it("Label (after): display value with label config", () => {
        const assertValue = 'test display value';
        component._placeholder = 'placeholder value';
        component.label = 'label value';
        component.labelConfig = { negativeLabel: '', positiveLabel: assertValue };
        fixture.detectChanges();

        expect(debugLabelAfterEl.nativeElement.innerText).toEqual(assertValue);
    });

    it("Label: label (main and after) should be linked to input element", () => {
        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(2);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
        expect(inputEl.labels[1].htmlFor).toEqual(inputEl.id);
    });

    it("Label: label (main, before and after) should be linked to input element", () => {
        component.labelConfig = { negativeLabel: '', positiveLabel: 'positive value' };
        fixture.detectChanges();

        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(3);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
        expect(inputEl.labels[1].htmlFor).toEqual(inputEl.id);
        expect(inputEl.labels[2].htmlFor).toEqual(inputEl.id);
    });

    it("Label (main): negative icon default", () => {
        const negativeIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-times')),
            positiveIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-check'));

        expect(negativeIconDefault).toBeDefined();
        expect(positiveIconDefault).toBeNull();
    });

    it("Label (main): negative icon custom", () => {
        component.negativeIcon = 'fa fa-auto'
        fixture.detectChanges();

        const negativeIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-times')),
            positiveIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-check')),
            customNegativeIcon = debugLabelMainEl.query(By.css('i.icon.fa.fa-auto'));

        expect(negativeIconDefault).toBeNull();
        expect(positiveIconDefault).toBeNull();
        expect(customNegativeIcon).toBeDefined();
    });

    it("Label (main): positive icon default", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, checked: true } });
        fixture.detectChanges();

        const negativeIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-times')),
            positiveIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-check'));

        expect(negativeIconDefault).toBeNull();
        expect(positiveIconDefault).toBeDefined();
    });

    it("Label (main): positive icon custom", () => {
        component.positiveIcon = 'fa fa-auto'
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, checked: true } });
        fixture.detectChanges();

        const negativeIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-times')),
            positiveIconDefault = debugLabelMainEl.query(By.css('i.icon.fa.fa-check')),
            customPositiveIcon = debugLabelMainEl.query(By.css('i.icon.fa.fa-auto'));

        expect(negativeIconDefault).toBeNull();
        expect(positiveIconDefault).toBeNull();
        expect(customPositiveIcon).toBeDefined();
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
});