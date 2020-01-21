import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {  DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './sfc-text-input.component';
import { SfcInputsModule } from '../sfc-inputs.module';


describe('Component: TextInputComponent', () => {

    let component: TextInputComponent;
    let fixture: ComponentFixture<TextInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let inputEl: any;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TextInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            inputEl = fixture.nativeElement.querySelector('input');
            debugInputEl = el.query(By.css('input'));
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

    it("Input: should create input element", () => {
        expect(inputEl).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(inputEl.id).toEqual("sfc-");
    });

    it("Input: id value", () => {
        component.id = "test-id";
        fixture.detectChanges();

        expect(inputEl.id).toEqual("sfc-test-id");
    });

    it("Input: default type value", () => {
        expect(inputEl.type).toEqual("text");
    });

    it("Input: type value defined", () => {
        const typeAssertValue = "email";
        component.type = typeAssertValue;
        fixture.detectChanges();

        expect(inputEl.type).toEqual(typeAssertValue);
    });

    it("Input: permanent class value", () => {
        expect(fixture.nativeElement.querySelector('input.input-text-input')).toBeDefined();
    });

    it("Input: placeholder value if value not defined", () => {
        expect(inputEl.placeholder).toEqual("");
    });

    it("Input: placeholder value", () => {
        const placeholderAssertValue = "test placeholder";
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual(placeholderAssertValue);
    });

    it("Input: default input value", () => {
        expect(inputEl.value).toEqual("");
    });

    it("Input: set input value", () => {
        const assertValue = "test value";
        component.writeValue(assertValue);
        fixture.detectChanges();

        expect(inputEl.value).toEqual(assertValue);
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
        const value = 'trigger input event';
        debugInputEl.nativeElement.value = value;

        debugInputEl.triggerEventHandler('input', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(inputEl.value).toEqual(value);
    });

    it("Input: focus event (label)", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual("active");
    });

    it("Input: focus event (placeholder)", () => {
        const placeholderAssertValue = "test placeholder";
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual(placeholderAssertValue);

        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual("");
    });

    it("Input: blur event", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        debugInputEl.triggerEventHandler('blur', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual("");
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
        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(1);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    it("Label: class value - active, when placeholder exist", () => {
        component._placeholder = "test placeholder";
        fixture.detectChanges();

        expect(labelEl.className).toEqual("active");
    });

    it("Label: class value - active, when input in focus", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
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

    it("Characters counter: hidden attribute value", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter').hidden).toBeTruthy();
    });
});