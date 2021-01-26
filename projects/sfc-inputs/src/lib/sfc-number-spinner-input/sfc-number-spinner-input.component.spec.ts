import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import { NumberSpinnerInputComponent } from './sfc-number-spinner-input.component';

describe('Component: NumberSpinnerInputComponent', () => {

    let component: NumberSpinnerInputComponent;
    let fixture: ComponentFixture<NumberSpinnerInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(NumberSpinnerInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugInputEl = el.query(By.css('input[type="number"].sfc-input'));
            labelEl = fixture.nativeElement.querySelector('label.main-label');

            fixture.detectChanges();
        });
    }));

    it("NumberSpinnerInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Host: fixed component", () => {
        component.fixed = true;
        fixture.detectChanges();

        expect(el.nativeElement.className).toContain(CommonConstants.CSS_CLASS_FIXED);
    });

    it("Host: fixed actions component", () => {
        component.fixedActions = true;
        fixture.detectChanges();

        expect(el.nativeElement.className).toContain('fixed-actions');
    });

    it("Container: default class", () => {
        expect(fixture.nativeElement.querySelector('div.input-number-spinner-container')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('div.input-number-spinner-container.disabled')).toBeNull();
    });

    it("Container: disabled component", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.input-number-spinner-container.disabled')).toBeTruthy();
    });

    it("Input: should create input element", () => {
        expect(debugInputEl.nativeElement).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(debugInputEl.nativeElement.id).toEqual('sfc-');
    });

    it("Input: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.id).toEqual('sfc-test-id');
    });

    it("Input: default type value", () => {
        expect(debugInputEl.nativeElement.type).toEqual('number');
    });

    it("Input: default input value", () => {
        expect(debugInputEl.nativeElement.value).toEqual('0');
    });

    it("Input: default input value when custom min value", () => {
        component.min = 10;
        component.writeValue(null); // for test purpose
        component.ngOnInit();
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('10');
    });

    it("Input: set input value", () => {
        const assertValue = 4;
        component.writeValue(assertValue);
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual(assertValue.toString());
    });

    it("Input: disabled default value", () => {
        expect(debugInputEl.nativeElement.disabled).toBeFalsy();
    });

    it("Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.disabled).toBeTruthy();
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
        expect(debugInputEl.nativeElement.labels).toBeDefined();
        expect(debugInputEl.nativeElement.labels.length).toEqual(1);
        expect(debugInputEl.nativeElement.labels[0].htmlFor).toEqual(debugInputEl.nativeElement.id);
    });

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
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Active);
    });

    it("Increment button: when max value is undefined", () => {
        expect(fixture.nativeElement.querySelector('span.lever.next')).toBeTruthy();
    });

    it("Increment button: when max value is defined and allow next number", () => {
        component.max = 3;
        component.writeValue(2);
        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('span.lever.next')).toBeTruthy();
    });

    it("Increment button: when max value is defined but not allow next number", () => {
        component.max = 3;
        component.writeValue(3);
        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('span.lever.next')).toBeNull();
    });

    it("Increment button: icon value default", () => {
        expect(fixture.nativeElement.querySelector('span.lever.next i.fa.fa-angle-right')).toBeTruthy();
    });

    it("Increment button: icon value custom", () => {
        component.nextIcon = 'fa fa-star';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.lever.next i.fa.fa-star')).toBeTruthy();
    });

    it("Increment button: click event with default step", () => {
        const incrementButton = el.query(By.css('span.lever.next'));
        incrementButton.triggerEventHandler('click', { target: incrementButton.nativeElement });
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('1');
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('1');
    });

    it("Increment button: click event with custom step (3)", () => {
        component.step = 3;
        component.writeValue(3);
        const incrementButton = el.query(By.css('span.lever.next'));
        incrementButton.triggerEventHandler('click', { target: incrementButton.nativeElement });
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('6');
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('6');
    });

    it("Increment button: increment not valid", () => {
        component.max = 3;
        component.writeValue(3);
        fixture.detectChanges();

        component.increment();

        expect(debugInputEl.nativeElement.value).toEqual('3');
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('3');
    });

    it("Decrement button: when min value is undefined", () => {
        expect(fixture.nativeElement.querySelector('span.lever.prev')).toBeTruthy();
    });

    it("Decrement button: when min value is defined and allow previous number", () => {
        component.min = 1;
        component.writeValue(2);
        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('span.lever.prev')).toBeTruthy();
    });

    it("Decrement button: when min value is defined but not allow next number", () => {
        component.min = 1;
        component.writeValue(1);
        fixture.detectChanges()

        expect(fixture.nativeElement.querySelector('span.lever.prev')).toBeNull();
    });

    it("Decrement button: icon value", () => {
        expect(fixture.nativeElement.querySelector('span.lever.prev i.fa.fa-angle-left')).toBeTruthy();
    });

    it("Decrement button: icon value custom", () => {
        component.prevIcon = 'fa fa-star';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.lever.prev i.fa.fa-star')).toBeTruthy();
    });

    it("Decrement button: click event with default step", () => {
        const decrementButton = el.query(By.css('span.lever.prev'));
        decrementButton.triggerEventHandler('click', { target: decrementButton.nativeElement });
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('-1');
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('-1');
    });

    it("Decrement button: click event with custom step (3)", () => {
        component.step = 3;
        component.writeValue(3);
        const decrementButton = el.query(By.css('span.lever.prev'));
        decrementButton.triggerEventHandler('click', { target: decrementButton.nativeElement });
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('0');
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('0');
    });

    it("Decrement button: decrement not valid", () => {
        component.min = 1;
        component.writeValue(1);
        fixture.detectChanges();

        component.decrement();

        expect(debugInputEl.nativeElement.value).toEqual('1');
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('1');
    });

    it("Spinner value: default value", () => {
        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual('0');
    });

    it("Spinner value: default input value when custom min value", () => {
        const assertValue = 10;
        component.min = assertValue;
        component.writeValue(null); // for test purpose
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual(assertValue.toString());
    });

    it("Spinner value: set input value", () => {
        const assertValue = 4;
        component.writeValue(assertValue);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.spinner-value span').innerText).toEqual(assertValue.toString());
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