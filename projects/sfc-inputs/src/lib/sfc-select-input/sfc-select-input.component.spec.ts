import { SelectInputComponent } from "./sfc-select-input.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import { StyleClass } from '../common/constants/common-constants';


describe('Component: SelectInputComponent', () => {

    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;
    let el: DebugElement;
    let debugTextInputEl: DebugElement;
    let textAreaEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectInputComponent);            
            el = fixture.debugElement;
            component = el.componentInstance;
            debugTextInputEl = el.query(By.css('input.input-select'));

            fixture.detectChanges();
        });
    }));

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Label: should exist", async(() => {
        let labelEl = fixture.nativeElement.querySelector('label');
        expect(labelEl).toBeTruthy();
    }));

    it("Label: 'for' attribute default value", async(() => {
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');
        expect(labelEl.htmlFor).toEqual("sfc-")
    }));

    it("Label: 'for' attribute value", async(() => {
        component.id = "test-id";
        fixture.detectChanges();
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');

        expect(labelEl.htmlFor).toEqual("sfc-test-id")
    }));

    it("Label: html text value default", async(() => {
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');        
        expect(labelEl.innerText).toEqual("")
    }));

    it("Label: html text value default", async(() => {
        component.label = "test label";
        fixture.detectChanges();
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');

        expect(labelEl.innerText).toEqual("test label")
    }));

    it("Label: CSS classes default", async(() => {
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');        
        expect(labelEl.className).toEqual("")
    }));

    it("Label: CSS classes with placeholder", async(() => {
        component._placeholder = "test placeholder";
        fixture.detectChanges();
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');    

        expect(labelEl.className).toEqual(StyleClass.Active)
    }));

    it("Label: CSS classes with defined value", async(() => {
        component.data = [{id: 1, value: "option 1"}, {id: 2, value: "option 2"}]
        component.writeValue(2);
        fixture.detectChanges();
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');    

        expect(labelEl.className).toEqual(StyleClass.Active)
    }));

    it("Label: CSS classes with icon", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');    

        expect(labelEl.className).toEqual(StyleClass.WithIcon)
    }));

    it("Label: CSS classes when focused", async(() => {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');    

        expect(labelEl.classList).not.toBeNull();
        expect(labelEl.classList).not.toBeUndefined();
        expect(labelEl.classList.length).toEqual(2);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(labelEl.classList.contains("isFocus")).toBeTruthy();
    }));

    it("Label: click event", async(() => {
        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');
        component.data = [{id: 1, value: "option 1"}, {id: 2, value: "option 2"}];
        component.ngOnInit();        
        labelEl.click();
        fixture.detectChanges();
            
        expect(labelEl.classList.length).toEqual(2);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(labelEl.classList.contains("isFocus")).toBeTruthy();
        expect(component.dropdownClasses).toEqual(StyleClass.Active);
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: CSS classes default", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains("fa")).toBeTruthy();
        expect(iconEl.classList.contains("fa-user")).toBeTruthy();
    });

    it("Icon: CSS classes when focuse", () => {
        component.icon = "fa fa-user";
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl.classList.length).toEqual(5);
        expect(iconEl.classList.contains("isFocus")).toBeTruthy();
    });

    it("Icon: click event", async(() => {        
        component.icon = "fa fa-user";
        component.data = [{id: 1, value: "option 1"}, {id: 2, value: "option 2"}];
        component.ngOnInit();  
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');
        iconEl.click();
        fixture.detectChanges();
        
        expect(iconEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(iconEl.classList.contains("isFocus")).toBeTruthy();
        expect(component.dropdownClasses).toEqual(StyleClass.Active);
    }));

});