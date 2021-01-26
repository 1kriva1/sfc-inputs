import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { StyleClass } from '../common/constants/common-constants';
import { RangeVerticalInputComponent } from './vertical/sfc-range-vertical-input.component';
import { UIUtils } from '../common/utils/ui-utils';


describe('Component: RangeInputComponent (Vertical and Horizontal)', () => {

    let component: RangeVerticalInputComponent;
    let fixture: ComponentFixture<RangeVerticalInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RangeVerticalInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugInputEl = el.query(By.css('input[type="range"].sfc-input'));
            labelEl = fixture.nativeElement.querySelector('label.main-label');

            fixture.detectChanges();
        });
    }));

    it("RangeInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Vertical container: when focused", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.input-range-container.focus')).toBeTruthy();
    });

    it("Vertical container: when disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.input-range-container.disabled')).toBeTruthy();
    });

    it("Vertical wrapper container: height value", () => {
        const heightValueAssert = UIUtils.getCssLikePx(debugInputEl.nativeElement.getBoundingClientRect().height),
            containerEl = fixture.nativeElement.querySelector('div.vertical-wrapper-outer');

        expect(containerEl.style.height).toEqual(heightValueAssert);
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

    it("Label: class value - active, when input in focus", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toContain(StyleClass.Active);
    });

    it("Label: class value - active, when value defined", () => {
        component.writeValue(4);
        fixture.detectChanges();

        expect(labelEl.className).toContain(StyleClass.Active);
    });

    it("Before Label: default state", () => {
        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.before-label');
        expect(beforeLabelEl).toBeNull();
    });

    it("Before Label: when show limit is true", () => {
        component.showLimits = true;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.before-label');

        expect(beforeLabelEl).toBeTruthy();
    });

    it("Before Label: when start icon is not empty", () => {
        component.startIcon = 'fa fa-star';
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.before-label');

        expect(beforeLabelEl).toBeTruthy();
    });

    it("Before Label: content when start icon is empty and default max value", () => {
        component.showLimits = true;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.before-label span');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.innerText).toEqual(component.max.toString());
    });

    it("Before Label: content when start icon is empty and custom max value", () => {
        component.showLimits = true;
        component.max = 10;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.before-label span');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.innerText).toEqual(component.max.toString());
    });

    it("Before Label: content when start icon is NOT empty", () => {
        component.startIcon = 'fa fa-star';
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.before-label i');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.className).toContain('fa');
        expect(beforeLabelEl.className).toContain('fa-star');
    });

    it("Before Label: content when show limit is true and start icon is NOT empty", () => {
        component.showLimits = true;
        component.startIcon = 'fa fa-star';
        fixture.detectChanges();

        const beforeLabelIconEl = fixture.nativeElement.querySelector('label.display-label.before-label i'),
            beforeLabelSpanEl = fixture.nativeElement.querySelector('label.display-label.before-label span');

        expect(beforeLabelIconEl).toBeTruthy();
        expect(beforeLabelSpanEl).toBeNull();
    });

    it("After Label: default state", () => {
        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label');
        expect(beforeLabelEl).toBeNull();
    });

    it("After Label: when show limit is true", () => {
        component.showLimits = true;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label');

        expect(beforeLabelEl).toBeTruthy();
    });

    it("After Label: when finish icon is not empty", () => {
        component.finishIcon = 'fa fa-star';
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label');

        expect(beforeLabelEl).toBeTruthy();
    });

    it("After Label: when show value is true", () => {
        component.showValue = true;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label');

        expect(beforeLabelEl).toBeTruthy();
    });

    it("After Label: content when finish icon is empty and default min value", () => {
        component.showLimits = true;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label span');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.innerText).toEqual(component.min.toString());
    });

    it("After Label: content when finish icon is empty and custom min value", () => {
        component.showLimits = true;
        component.min = 10;
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label span');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.innerText).toEqual(component.min.toString());
    });

    it("After Label: content when finish icon is empty and show value is true", () => {
        component.showValue = true;
        component.writeValue(44);
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label span');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.innerText).toEqual('44');
    });

    it("After Label: content when finish icon is NOT empty", () => {
        component.finishIcon = 'fa fa-star';
        fixture.detectChanges();

        const beforeLabelEl = fixture.nativeElement.querySelector('label.display-label.after-label i');

        expect(beforeLabelEl).toBeTruthy();
        expect(beforeLabelEl.className).toContain('fa');
        expect(beforeLabelEl.className).toContain('fa-star');
    });

    it("After Label: content when show limit is true and finish icon is NOT empty", () => {
        component.showLimits = true;
        component.finishIcon = 'fa fa-star';
        fixture.detectChanges();

        const beforeLabelIconEl = fixture.nativeElement.querySelector('label.display-label.after-label i'),
            beforeLabelSpanEl = fixture.nativeElement.querySelector('label.display-label.after-label span');

        expect(beforeLabelIconEl).toBeTruthy();
        expect(beforeLabelSpanEl).toBeNull();
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
        expect(debugInputEl.nativeElement.type).toEqual('range');
    });

    it("Input: min value default", () => {
        expect(debugInputEl.properties.min).toEqual(component.min.toString());
    });

    it("Input: min value custom", () => {
        component.min = 10;
        fixture.detectChanges();

        expect(debugInputEl.properties.min).toEqual(component.min.toString());
    });

    it("Input: max value default", () => {
        expect(debugInputEl.properties.max).toEqual(component.max.toString());
    });

    it("Input: max value custom", () => {
        component.max = 10;
        fixture.detectChanges();

        expect(debugInputEl.properties.max).toEqual(component.max.toString());
    });

    it("Input: step value default", () => {
        expect(debugInputEl.properties.max).toEqual(component.max.toString());
    });

    it("Input: step value custom", () => {
        component.step = 10;
        fixture.detectChanges();

        expect(debugInputEl.properties.step).toEqual(component.step.toString());
    });

    it("Input: default input value", () => {
        expect(debugInputEl.nativeElement.value).toEqual(component.min.toString());
    });

    it("Input: set input value", () => {
        const assertValue = 44;
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

    it("Input: change event", () => {
        const value = 44;
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: value } });
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual(value.toString());
    });

    it("Input: focus event (label)", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toContain(StyleClass.Active);
    });

    it("Input: blur event", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        debugInputEl.triggerEventHandler('blur', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).not.toContain(StyleClass.Active);
    });

    it("Input: mousedown event", () => {
        debugInputEl.triggerEventHandler('mousedown', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.range-tooltip.showTooltip')).toBeTruthy();
    });

    it("Input: mousedown event when tooltip is false", () => {
        component.tooltip = false;
        debugInputEl.triggerEventHandler('mousedown', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.range-tooltip.showTooltip')).toBeNull();
    });

    it("Input: mouseup event", () => {
        debugInputEl.triggerEventHandler('mousedown', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.range-tooltip.showTooltip')).toBeTruthy();

        debugInputEl.triggerEventHandler('mouseup', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.range-tooltip.showTooltip')).toBeNull();
    });

    it("Tooltip: should exist", () => {
        expect(fixture.nativeElement.querySelector('span.range-tooltip')).toBeTruthy();
    });

    it("Tooltip: when tooltip is false", () => {
        component.tooltip = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.range-tooltip')).toBeNull();
    });

    it("Tooltip: default attributes", () => {
        const tooltipEl = fixture.nativeElement.querySelector('span.range-tooltip');

        expect(tooltipEl.attributes['sfc-tooltip-location'].value).toEqual('bottom');
        expect(tooltipEl.attributes['ng-reflect-show-tooltip'].value).toEqual('false');
        expect(tooltipEl.attributes['data-sfc-tooltip'].value).toEqual('0');
        expect(tooltipEl.style.left).toContain('calc(0%');
    });

    it("Tooltip: attributes when has value", () => {
        component.writeValue(44);
        fixture.detectChanges();

        const tooltipEl = fixture.nativeElement.querySelector('span.range-tooltip');

        expect(tooltipEl.attributes['sfc-tooltip-location'].value).toEqual('bottom');
        expect(tooltipEl.attributes['ng-reflect-show-tooltip'].value).toEqual('false');
        expect(fixture.nativeElement.querySelector('span.range-tooltip.showTooltip')).toBeNull();
        expect(tooltipEl.attributes['data-sfc-tooltip'].value).toEqual('44');
        expect(tooltipEl.style.left).toContain('calc(44%');
    });

    it("Tooltip: attributes when has value and mousedown on input", () => {
        component.writeValue(44);
        debugInputEl.triggerEventHandler('mousedown', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        const tooltipEl = fixture.nativeElement.querySelector('span.range-tooltip');

        expect(tooltipEl.attributes['sfc-tooltip-location'].value).toEqual('bottom');
        expect(tooltipEl.attributes['ng-reflect-show-tooltip'].value).toEqual('true');
        expect(fixture.nativeElement.querySelector('span.range-tooltip.showTooltip')).toBeTruthy();
        expect(tooltipEl.attributes['data-sfc-tooltip'].value).toEqual('44');
        expect(tooltipEl.style.left).toContain('calc(44%');
    });

    it("Tooltip: attributes when change value", () => {
        component.writeValue(10);
        fixture.detectChanges();

        const tooltipBeforeEl = fixture.nativeElement.querySelector('span.range-tooltip');

        expect(tooltipBeforeEl.attributes['data-sfc-tooltip'].value).toEqual('10');
        expect(tooltipBeforeEl.style.left).toContain('calc(10%');

        const value = 44;
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: value } });
        fixture.detectChanges();

        const tooltipAfterEl = fixture.nativeElement.querySelector('span.range-tooltip');

        expect(tooltipAfterEl.attributes['data-sfc-tooltip'].value).toEqual('44');
        expect(tooltipAfterEl.style.left).toContain('calc(44%');
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