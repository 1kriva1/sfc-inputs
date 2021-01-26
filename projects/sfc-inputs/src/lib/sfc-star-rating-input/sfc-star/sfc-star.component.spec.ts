import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { StarComponent } from './sfc-star.component';

describe('Component: StarComponent', () => {

    let component: StarComponent;
    let fixture: ComponentFixture<StarComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let labelEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(StarComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugInputEl = el.query(By.css('input[type="radio"].star'));
            labelEl = el.query(By.css('label.star'));

            fixture.detectChanges();
        });
    }));

    it("StarComponent: should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Container: should exist with default class", async(() => {
        expect(el.query(By.css('div.star-container'))).toBeTruthy();
    }));

    it("Container: highlighted", async(() => {
        component.highlighted = true;
        fixture.detectChanges();

        expect(el.query(By.css('div.star-container.highlighted'))).toBeTruthy();
    }));

    it("Container: highlighted min", async(() => {
        component.highlightedMin = true;
        fixture.detectChanges();
        
        expect(el.query(By.css('div.star-container.highlighted-min'))).toBeTruthy();
    }));

    it("Container: highlighted max", async(() => {
        component.highlightedMax = true;
        fixture.detectChanges();
        
        expect(el.query(By.css('div.star-container.highlighted-max'))).toBeTruthy();
    }));

    it("Container: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();
        
        expect(el.query(By.css('div.star-container.disabled'))).toBeTruthy();
    }));

    it("Input: should create input element", () => {
        expect(debugInputEl.nativeElement).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(debugInputEl.nativeElement.id).toEqual('sfc-star-');
    });

    it("Input: id value", () => {
        component.id = 4;
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.id).toEqual('sfc-star-4');
    });

    it("Input: default type value", () => {
        expect(debugInputEl.nativeElement.type).toEqual('radio');
    });

    it("Input: default name", () => {
        expect(debugInputEl.nativeElement.name).toEqual('star');
    });

    it("Input: disabled default value", () => {
        expect(debugInputEl.nativeElement.disabled).toBeFalsy();
    });

    it("Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.disabled).toBeTruthy();
    });

    it("Checked event: was called", () => {
        spyOn(component.checked, 'emit');

        debugInputEl.triggerEventHandler('click', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(component.checked.emit).toHaveBeenCalled();
    });

    it("Checked event: was called with value", () => {        
        spyOn(component.checked, 'emit');
        component.value = 4;        
        fixture.detectChanges();

        debugInputEl.triggerEventHandler('click', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(component.checked.emit).toHaveBeenCalledWith(component.value);
    });

    it("Label: should create label element", () => {
        expect(labelEl.nativeElement).toBeDefined();
    });

    it("Label: label should be linked to input element", () => {
        expect(debugInputEl.nativeElement.labels).toBeDefined();
        expect(debugInputEl.nativeElement.labels.length).toEqual(1);
        expect(debugInputEl.nativeElement.labels[0].htmlFor).toEqual(debugInputEl.nativeElement.id);
    });
});