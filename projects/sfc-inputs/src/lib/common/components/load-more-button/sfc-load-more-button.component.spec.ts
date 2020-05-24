import { LoadMoreButtonComponent } from "./sfc-load-more-button.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement, EventEmitter } from '@angular/core';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { Observable } from 'rxjs';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { By } from '@angular/platform-browser';

describe('Component: LoadMoreButtonComponent', () => {
    let component: LoadMoreButtonComponent;
    let fixture: ComponentFixture<LoadMoreButtonComponent>;
    let el: DebugElement;

    let mockLoader = (hasNext:boolean): () => Observable<ILoadMoreData> => {

        return (): Observable<ILoadMoreData> => {
            const testData: ILoadMoreData = { HasNext: hasNext, Items: [{ key: 1, value: "test_1" }, { key: 2, value: "test_2" }] }
            return Observable.of<ILoadMoreData>(testData);
        };        
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoadMoreButtonComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            component.loader = mockLoader(true);

            fixture.detectChanges();
        });
    }));

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Delimeter should exist", async(() => {
        const delimeterEl = el.query(By.css('hr.main-hr'));
        expect(delimeterEl).toBeTruthy();
    }));

    it("Show more button should exist", async(() => {
        const buttonEl = el.query(By.css('div.btn'));
        expect(buttonEl).toBeTruthy();
    }));

    it("Show more button icon should exist", async(() => {
        const buttonIconEl = el.query(By.css('i.fa-chevron-circle-down.show-more-icon'));
        expect(buttonIconEl).toBeTruthy();
    }));

    it("Show more button text value", async(() => {
        const buttonSpanEl = el.query(By.css('span.text'));
        expect(buttonSpanEl).toBeTruthy();
        expect(buttonSpanEl.nativeElement.innerText).toEqual("SHOW MORE");
    }));

    it("Click(mouseDown) event: clicked was emited", async(() => {
        component.clicked = new EventEmitter();
        spyOn(component.clicked, 'emit');

        el.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));

        expect(component.clicked.emit).toHaveBeenCalled();
    }));

    it("Updated event: updated was emited", async(() => {
        component.updated = new EventEmitter();
        spyOn(component.updated, 'emit');

        el.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));

        expect(component.updated.emit).toHaveBeenCalled();
    }));

    it("Loader function NOT defined: updated event not called", async(() => {
        component.loader = null;
        fixture.detectChanges();

        component.updated = new EventEmitter();
        spyOn(component.updated, 'emit');

        el.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));

        expect(component.updated.emit).not.toHaveBeenCalled();
    }));

    it("immediateCallback is TRUE", async(() => {
        component.immediateCallback = true;
        component.updated = new EventEmitter();
        spyOn(component.updated, 'emit');
        component.ngAfterViewInit();        

        fixture.detectChanges();

        expect(component.updated.emit).toHaveBeenCalled();
    }));

    it("Data has next page", async(() => {
        el.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));

        fixture.detectChanges();

        const buttonEl = el.query(By.css('div.btn'));
        expect(buttonEl).toBeTruthy();
    }));

    it("Data has NOT next page", async(() => {
        component.loader = mockLoader(false);
        fixture.detectChanges();

        el.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));

        fixture.detectChanges();

        const buttonEl = el.query(By.css('div.btn'));
        expect(buttonEl).toBeFalsy();
    }));    
});