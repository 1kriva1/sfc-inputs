import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { TooltipComponent } from './sfc-tooltip.component';
import { LocationType, TooltipType } from '../../constants/common-constants';
import { CommonUtils } from '../../utils/common-utils';

@Component({
    template: `<span [sfc-tooltip]="displayValue" [sfc-tooltip-type]="tooltipType" [sfc-tooltip-location]="tooltipLocation" [sfc-show-tooltip]="showTooltip">
                    test content
               </span>`
})
class TestTooltipComponent {

    @ViewChild(TooltipComponent, { static: false })
    public tooltipComponent: TooltipComponent;

    displayValue: string;

    tooltipType: TooltipType;

    tooltipLocation: string;

    showTooltip: boolean;
}

describe('Component: BaseInputComponent', () => {

    let component: TestTooltipComponent;
    let fixture: ComponentFixture<TestTooltipComponent>;
    let el: DebugElement;
    let tooltipEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [TestTooltipComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TestTooltipComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            tooltipEl = el.query(By.css('span'));
            fixture.detectChanges();
        });
    }));

    it("Display value: default value", () => {
        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('content');
        expect(value).toEqual('""');
    });

    it("Display value: defined value", () => {
        component.displayValue = 'test tooltip';
        fixture.detectChanges();

        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('content');
        expect(value).toEqual('"' + component.displayValue + '"');
    });

    it("Tooltip visibility: default state", () => {
        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('visibility');
        expect(value).toEqual('hidden');
    });

    // can't handle hover testing
    xit("Tooltip visibility: when hover element", () => {
        component.tooltipType = TooltipType.Hover;
        fixture.detectChanges();

        tooltipEl.triggerEventHandler('mouseover', { target: tooltipEl.nativeElement });
        fixture.detectChanges();

        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('visibility');
        expect(value).toEqual('visible');
    });

    it("Tooltip visibility: when click element", () => {
        component.tooltipType = TooltipType.Click;
        fixture.detectChanges();
        tooltipEl.triggerEventHandler('click', { target: tooltipEl.nativeElement });
        fixture.detectChanges();

        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('visibility');
        //expect(value).toEqual('visible');
        expect(component.tooltipComponent.showTooltip).toBeTruthy();
    });

    it("Tooltip visibility: when show and than hide tooltip by click component", () => {
        component.tooltipType = TooltipType.Click;
        fixture.detectChanges();
        tooltipEl.triggerEventHandler('click', { target: tooltipEl.nativeElement });
        fixture.detectChanges();

        const valueBefore = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('visibility');
        //expect(valueBefore).toEqual('visible');
        expect(component.tooltipComponent.showTooltip).toBeTruthy();

        tooltipEl.triggerEventHandler('click', { target: tooltipEl.nativeElement });
        fixture.detectChanges();

        const valueAfter = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('visibility');
        //expect(valueAfter).toEqual('hidden');
        expect(component.tooltipComponent.showTooltip).toBeFalsy();
    });

    it("Tooltip location: default value", () => {
        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('bottom');
        expect(CommonUtils.isNullOrEmptyString(value)).toBeFalsy();
        expect(component.tooltipComponent.location).toEqual(LocationType.Top);
    });

    it("Tooltip location: custom value", () => {
        component.tooltipLocation = LocationType.Bottom;
        fixture.detectChanges();

        const value = window.getComputedStyle(tooltipEl.nativeElement, ':before').getPropertyValue('top');
        expect(CommonUtils.isNullOrEmptyString(value)).toBeFalsy();
        expect(component.tooltipComponent.location).toEqual(LocationType.Bottom);
    });

    it("Tooltip type: default value", () => {
        expect(component.tooltipComponent.type).toEqual(TooltipType.Hover);
        expect(tooltipEl.attributes['sfc-tooltip-type']).toEqual(TooltipType.Hover);
    });

    it("Tooltip type: custom value", () => {
        component.tooltipType = TooltipType.Click;
        fixture.detectChanges();

        expect(component.tooltipComponent.type).toEqual(TooltipType.Click);
        expect(tooltipEl.attributes['sfc-tooltip-type']).toEqual(TooltipType.Click);
    });

    it("Tooltip show: default value", () => {
        expect(tooltipEl.nativeElement.className).not.toContain('showTooltip');
    });

    it("Tooltip show: change showTooltip to true", () => {
        component.showTooltip = true;
        fixture.detectChanges();

        expect(tooltipEl.nativeElement.className).toContain('showTooltip');
    });
});