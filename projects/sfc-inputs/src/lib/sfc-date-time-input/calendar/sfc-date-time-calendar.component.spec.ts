import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { DateTimeCalendarComponent } from './sfc-date-time-calendar.component';
import { CommonConstants } from '../../common/constants/common-constants';
import { WeekDay } from '@angular/common';

describe('Component: DateTimeInputComponent - Calendar', () => {

    let component: DateTimeCalendarComponent;
    let fixture: ComponentFixture<DateTimeCalendarComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DateTimeCalendarComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it("DateTimeCalendarComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Month: when current date is null", async(() => {
        expect(fixture.nativeElement.querySelector('div.dtp-picker-month').innerText).toEqual('');
    }));

    it("Month: when current date is not null(now)", async(() => {
        component.currentDate = new Date(1992, 11, 1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dtp-picker-month').innerText).toEqual('DECEMBER 1992');
    }));

    it("Week days: when current date is null", async(() => {
        expect(el.queryAll(By.css('th')).length).toEqual(0);
    }));

    it("Week days: when current date is not null", async(() => {
        component.currentDate = new Date();
        fixture.detectChanges();

        expect(el.queryAll(By.css('th')).length).toEqual(CommonConstants.DAYS_IN_WEEK);
    }));

    it("Week days: first day of week (with default weekStart)", async(() => {
        component.currentDate = new Date();
        fixture.detectChanges();

        expect(el.query(By.css('th')).nativeElement.innerText).toEqual(CommonConstants.DAYS_OF_WEEK_3[component.weekStart]);
    }));

    it("Week days: first day of week (with custom weekStart)", async(() => {
        component.weekStart = WeekDay.Sunday;
        component.currentDate = new Date();
        fixture.detectChanges();

        expect(el.query(By.css('th')).nativeElement.innerText).toEqual(CommonConstants.DAYS_OF_WEEK_3[component.weekStart]);
    }));

    it("Weeks: when current date is null", async(() => {
        expect(el.queryAll(By.css('tbody tr')).length).toEqual(0);
    }));

    it("Weeks: when current date is not null(5 weeks in month)", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.queryAll(By.css('tbody tr')).length).toEqual(5);
    }));

    it("Weeks: when current date is not null(4 weeks in month)", async(() => {
        component.currentDate = new Date(2021, 1, 1);
        fixture.detectChanges();

        expect(el.queryAll(By.css('tbody tr')).length).toEqual(4);
    }));

    it("Week days: fixed count", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.query(By.css('tbody tr')).queryAll(By.css('td')).length).toEqual(CommonConstants.DAYS_IN_WEEK);
    }));

    it("Week days: count all days", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.queryAll(By.css('a.dtp-select-day')).length).toEqual(31);
    }));

    it("Week days: days not in current month", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        for (let i = 0; i < 4; i++) {
            expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[i].query(By.css('a.dtp-select-day'))).toBeNull();
        }

    }));

    it("Week days: days number that in current month", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        for (let i = 1; i <= 3; i++) {
            expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[3 + i].query(By.css('a.dtp-select-day')).nativeElement.innerText).toEqual('0' + i);
        }
    }));

    it("Week days: select day that initialy selected", async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        selectDate(el.query(By.css('tbody tr')).queryAll(By.css('td'))[4].query(By.css('a.dtp-select-day')));

        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    it("Week days: select day that already selected", async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        selectDate(el.query(By.css('tbody tr')).queryAll(By.css('td'))[5].query(By.css('a.dtp-select-day')), new Date(2021, 0, 2));
        selectDate(el.query(By.css('tbody tr')).queryAll(By.css('td'))[5].query(By.css('a.dtp-select-day')));

        expect(component.selected.emit).toHaveBeenCalledTimes(1);
    }));

    it("Week days: select day that is not selected", async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        const selectEvent = selectDate(el.query(By.css('tbody tr')).queryAll(By.css('td'))[5].query(By.css('a.dtp-select-day')));

        expect(component.selected.emit).toHaveBeenCalledTimes(1);
        expect(component.selected.emit).toHaveBeenCalledWith({ event: selectEvent, date: new Date(2021, 0, 2) });
    }));

    it("Week days(class): initialy selected", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.queryAll(By.css('a.dtp-select-day.selected')).length).toEqual(1);
    }));

    it("Week days(class): select new day", async(() => {
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[4].query(By.css('a.dtp-select-day.selected'))).toBeDefined();

        selectDate(el.query(By.css('tbody tr')).queryAll(By.css('td'))[5].query(By.css('a.dtp-select-day')), new Date(2021, 0, 2));

        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[4].query(By.css('a.dtp-select-day.selected'))).toBeNull();
        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[5].query(By.css('a.dtp-select-day.selected'))).toBeDefined();
    }));

    it("Week days(class): disabled by min date", async(() => {
        component.minDate = new Date(2021, 0, 2);
        component.currentDate = new Date(2021, 0, 3);
        fixture.detectChanges();

        expect(el.queryAll(By.css('tbody tr a.dtp-select-day.disabled')).length).toEqual(1);
        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[4].query(By.css('a.dtp-select-day.disabled'))).toBeDefined();
    }));

    it("Week days(class): disabled by max date", async(() => {
        component.maxDate = new Date(2021, 0, 2);
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[4].query(By.css('a.dtp-select-day.disabled'))).toBeNull();
        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[5].query(By.css('a.dtp-select-day.disabled'))).toBeNull();
        expect(el.queryAll(By.css('tbody tr a.dtp-select-day.disabled')).length).toEqual(29);
    }));

    it("Week days(class): disabled by disabled days", async(() => {
        component.disabledDays = [new Date(2021, 0, 1)];
        component.currentDate = new Date(2021, 0, 2);
        fixture.detectChanges();

        expect(el.queryAll(By.css('tbody tr a.dtp-select-day.disabled')).length).toEqual(1);
        expect(el.query(By.css('tbody tr')).queryAll(By.css('td'))[4].query(By.css('a.dtp-select-day.disabled'))).toBeDefined();
    }));

    it("Week days(class): disabled by man, max and disabled days", async(() => {
        component.disabledDays = [new Date(2021, 0, 1)];
        component.minDate = new Date(2021, 0, 3);
        component.maxDate = new Date(2021, 0, 5);
        component.currentDate = new Date(2021, 0, 4);
        fixture.detectChanges();

        expect(el.queryAll(By.css('tbody tr a.dtp-select-day.disabled')).length).toEqual(28);
    }));

    it("Week days(class): disabled and also selected day", async(() => {
        component.disabledDays = [new Date(2021, 0, 1)];
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(el.queryAll(By.css('tbody tr a.dtp-select-day.disabled')).length).toEqual(1);
        expect(el.queryAll(By.css('tbody tr a.dtp-select-day.selected')).length).toEqual(0);
    }));

    it("Calendar: re-build calendar on change current date", async(() => {
        spyOn<any>(component, 'setDate').and.callThrough();
        component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        component.currentDate = new Date(2020, 0, 1);
        fixture.detectChanges();

        expect(component['setDate']).toHaveBeenCalledTimes(2);
    }));

    function selectDate(dateEl: DebugElement, value: Date = null): any {
        const event = { target: dateEl.nativeElement, button: 0 };
        dateEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        if (value) {
            component.currentDate = value;
            fixture.detectChanges();
        }

        return event;
    }
});