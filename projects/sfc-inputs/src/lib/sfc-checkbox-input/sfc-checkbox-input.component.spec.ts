import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { StyleClass } from '../common/constants/common-constants';
import { CheckboxInputComponent } from './sfc-checkbox-input.component';


describe('Component: CheckboxInputComponent', () => {

    let component: CheckboxInputComponent;
    let fixture: ComponentFixture<CheckboxInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let debugLabelEl: DebugElement;
    let debugLabelTextEl: DebugElement;
    let inputEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CheckboxInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            inputEl = fixture.nativeElement.querySelector('input[type=checkbox].sfc-input');
            debugInputEl = el.query(By.css('input[type=checkbox].sfc-input'));
            debugLabelEl = el.query(By.css('input[type=checkbox].sfc-input ~ label'));
            debugLabelTextEl = el.query(By.css('input[type=checkbox].sfc-input ~ label > p'));
            
            fixture.detectChanges();
        });        
    }));

    it("CheckboxInputComponent: Should create component", async(() => {
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
        expect(inputEl.value).toEqual('');
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
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, checked: true} });
        fixture.detectChanges();

        expect(inputEl.value).toEqual('true');
        expect(inputEl.checked).toEqual(true);
    });

    it("Label: display value without placeholder and label", () => {
        expect(debugLabelTextEl.nativeElement.innerText).toEqual('');
    });

    it("Label: display value with defined placeholder", () => {
        const assertValue = 'test display value';
        component._placeholder = assertValue;
        fixture.detectChanges();

        expect(debugLabelTextEl.nativeElement.innerText).toEqual(assertValue);
    });

    it("Label: display value with defined label", () => {
        const assertValue = 'test display value';
        component.label = assertValue;
        fixture.detectChanges();

        expect(debugLabelTextEl.nativeElement.innerText).toEqual(assertValue);
    });

    it("Label: label should be linked to input element", () => { 
        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(1);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    it("Label: class value - empty, when placeholder and label not exist", () => {
        expect(debugLabelEl.nativeElement.className).toEqual(StyleClass.Empty);
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