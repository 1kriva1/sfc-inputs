import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { DateTimeYearComponent } from './sfc-date-time-year.component';

describe('Component: DateTimeInputComponent - Year picker', () => {

    let component: DateTimeYearComponent;
    let fixture: ComponentFixture<DateTimeYearComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DateTimeYearComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it("DateTimeYearComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Years: empty list of years when current date is null", async(() => {
        expect(el.queryAll(By.css('div.year-picker-item')).length).toEqual(0);
    }));

    it("Years: list of years when current date is defined", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        const yearItemEls = el.queryAll(By.css('div.year-picker-item'));
        expect(yearItemEls.length).toEqual(7);
        for (let i = 0; i < yearItemEls.length; i++) {
            expect(yearItemEls[i].nativeElement.innerText).toEqual((1989 + i).toString());
        }
    }));

    it("Years: initialy active year", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        const selectedYearEl = el.queryAll(By.css('div.year-picker-item.active'));
        expect(selectedYearEl.length).toEqual(1);
        expect(selectedYearEl[0].nativeElement.innerText).toEqual('1992');
    }));

    it("Years: select year and change active year", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        selectYear(el.queryAll(By.css('div.year-picker-item'))[4], new Date(1993, 11, 1))

        const selectedYearEl = el.queryAll(By.css('div.year-picker-item.active'));

        expect(selectedYearEl.length).toEqual(1);
        expect(selectedYearEl[0].nativeElement.innerText).toEqual('1993');
    }));

    it("Years: select year event emit", async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        selectYear(el.queryAll(By.css('div.year-picker-item'))[4], new Date(1993, 11, 1));

        expect(component.selected.emit).toHaveBeenCalledTimes(1);
        expect(component.selected.emit).toHaveBeenCalledWith(1993);
    }));

    it("Years: disabled year by min date", async(() => {
        component.minDate = new Date(1991, 11, 1);
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        const disabledYearEl = el.queryAll(By.css('div.year-picker-item.disabled'));

        expect(disabledYearEl.length).toEqual(2);
        expect(el.queryAll(By.css('div.year-picker-item'))[0].classes.disabled).toBeTruthy();
        expect(el.queryAll(By.css('div.year-picker-item'))[1].classes.disabled).toBeTruthy();
    }));

    it("Years: disabled year by max date", async(() => {
        component.maxDate = new Date(1993, 11, 1);
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        const disabledYearEl = el.queryAll(By.css('div.year-picker-item.disabled'));

        expect(disabledYearEl.length).toEqual(2);
        expect(el.queryAll(By.css('div.year-picker-item'))[5].classes.disabled).toBeTruthy();
        expect(el.queryAll(By.css('div.year-picker-item'))[6].classes.disabled).toBeTruthy();
    }));

    it("Years: disabled year by min and max date", async(() => {
        component.minDate = new Date(1991, 11, 1);
        component.maxDate = new Date(1993, 11, 1);
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        const disabledYearEl = el.queryAll(By.css('div.year-picker-item.disabled'));

        expect(disabledYearEl.length).toEqual(4);
        expect(el.queryAll(By.css('div.year-picker-item'))[0].classes.disabled).toBeTruthy();
        expect(el.queryAll(By.css('div.year-picker-item'))[1].classes.disabled).toBeTruthy();
        expect(el.queryAll(By.css('div.year-picker-item'))[5].classes.disabled).toBeTruthy();
        expect(el.queryAll(By.css('div.year-picker-item'))[6].classes.disabled).toBeTruthy();
    }));

    it("Buttons: should NOT create buttons", async(() => {
        expect(el.queryAll(By.css('sfc-button')).length).toEqual(0);
    }));

    it("Buttons: should create two buttons", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        expect(el.queryAll(By.css('sfc-button.dtp-select-year-range')).length).toEqual(2);
    }));

    it("Buttons: icons value", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        const beforeBtnEl = el.queryAll(By.css('sfc-button.dtp-select-year-range'))[0],
            afterBtnEl = el.queryAll(By.css('sfc-button.dtp-select-year-range'))[1];

        expect(beforeBtnEl.attributes.icon).toEqual('fa fa-chevron-up');
        expect(afterBtnEl.attributes.icon).toEqual('fa fa-chevron-down');
    }));

    it("Buttons: on year before", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();
        onYearRange();

        const yearItemEls = el.queryAll(By.css('div.year-picker-item'));

        for (let i = 0; i < yearItemEls.length; i++) {
            expect(yearItemEls[i].nativeElement.innerText).toEqual((1988 + i).toString());
        }
    }));

    it("Buttons: on year after", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();
        onYearRange(false);

        const yearItemEls = el.queryAll(By.css('div.year-picker-item'));

        for (let i = 0; i < yearItemEls.length; i++) {
            expect(yearItemEls[i].nativeElement.innerText).toEqual((1990 + i).toString());
        }
    }));

    function onYearRange(before: boolean = true): any {
        const beforeBtnEl = el.queryAll(By.css('sfc-button.dtp-select-year-range'))[before ? 0 : 1],
            event = { target: beforeBtnEl.nativeElement, button: 0 };
        beforeBtnEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        return event;
    }

    function selectYear(yearEl: DebugElement, value: Date = null) {
        const event = { target: yearEl.nativeElement, button: 0 };
        yearEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        if (value) {
            component.currentDate = value;
            fixture.detectChanges();
        }
    }
});