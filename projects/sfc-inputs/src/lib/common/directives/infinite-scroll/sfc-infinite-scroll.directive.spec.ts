import { Component, DebugElement, ViewChild, ElementRef } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { InfiniteScrollerDirective } from './sfc-infinite-scroll.directive';
import ISelectData from '../../interfaces/select-input/ISelectData';

@Component({
    template: `
    <ul #scrollContainer [infinite-scroller]='showInfiniteScroller' [scrollPercent]='scrollPercent'
        [immediateCallback]='isImmediateCallback' [loader]='loader' (scrolled)='onLoadMore()'
        (updated)='updateData($event)'>
        <li *ngFor='let item of data'>   
            {{item}}         
        </li>
    </ul>
        `,
    styles: ['ul { height: 100px; overflow:hidden; overflow-y:scroll;}']
})
export class InfiniteScrollerTestComponent {

    showInfiniteScroller: boolean = false;
    isImmediateCallback: boolean = false;
    scrollPercent: number = 100;
    loader: any;
    data: Array<string>;

    @ViewChild('scrollContainer', { static: false, read: InfiniteScrollerDirective })
    infinityScroll: InfiniteScrollerDirective;

    @ViewChild('scrollContainer', { static: false })
    myScrollContainer: ElementRef;

    mockLoader = (hasNext: boolean): () => Observable<ILoadMoreData<ISelectData>> => {

        return (): Observable<ILoadMoreData<ISelectData>> => {
            const testData: ILoadMoreData<ISelectData> = { HasNext: hasNext, Items: [{ key: 1, value: 'test_1' }, { key: 2, value: 'test_2' }] }
            return Observable.of<ILoadMoreData<ISelectData>>(testData);
        };
    }

    constructor() {
        this.loader = this.mockLoader(true);
        
        // need for scroll checking
        this.data = ['option_1', 'option_2', 'option_3', 'option_4', 'option_5', 'option_6', 'option_7', 'option_8'];
    }

    onLoadMore() { }

    updateData() { }

    scrollToBottom(scrollPercentage: number = null): void {
        let scrollContainer = this.myScrollContainer.nativeElement;
        scrollContainer.scrollTop = scrollPercentage
            ? ((scrollContainer.scrollHeight - scrollContainer.offsetHeight) / 100) * scrollPercentage
            : scrollContainer.scrollHeight;
    }

    enableShowInfiniteScroller(){
        this.infinityScroll.infiniteScroller = true;
        this.infinityScroll.ngAfterViewInit();
    }

    scrollToTop(): void {
        this.myScrollContainer.nativeElement.scrollTop = 0;
    }
}

describe('Directive: InfiniteScroller', () => {
    let component: InfiniteScrollerTestComponent;
    let fixture: ComponentFixture<InfiniteScrollerTestComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [InfiniteScrollerTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(InfiniteScrollerTestComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it('Infinite Scroller: set enabled', async(() => {
        spyOn<any>(component.infinityScroll, 'setUpScrollProcess').and.callThrough();
        enableInfinityScroller();

        expect(component.infinityScroll['setUpScrollProcess']).toHaveBeenCalledTimes(1);
    }));

    it('Infinite Scroller: set enabled and check all init steps', async(() => {
        spyOn<any>(component.infinityScroll, 'registerScrollEvent').and.callThrough();
        spyOn<any>(component.infinityScroll, 'streamScrollEvents').and.callThrough();
        spyOn<any>(component.infinityScroll, 'requestCallbackOnScroll').and.callThrough();

        enableInfinityScroller();

        expect(component.infinityScroll['registerScrollEvent']).toHaveBeenCalledTimes(1);
        expect(component.infinityScroll['streamScrollEvents']).toHaveBeenCalledTimes(1);
        expect(component.infinityScroll['requestCallbackOnScroll']).toHaveBeenCalledTimes(1);
    }));

    it('Infinite Scroller: stay disabled', async(() => {
        spyOn<any>(component.infinityScroll, 'setUpScrollProcess').and.callThrough();

        expect(component.infinityScroll['setUpScrollProcess']).not.toHaveBeenCalled();
    }));

    it('Infinite Scroller: set enabled but loader function not defined', async(() => {
        spyOn<any>(component.infinityScroll, 'setUpScrollProcess').and.callThrough();

        component.loader = null;
        fixture.detectChanges();
        enableInfinityScroller();

        expect(component.infinityScroll['setUpScrollProcess']).not.toHaveBeenCalledTimes(1);
    }));

    it('Immediate callback is FALSE', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');

        enableInfinityScroller();

        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
    }));

    it('Immediate callback is TRUE', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        spyOn<any>(component.infinityScroll, 'requestCallbackOnScroll').and.callThrough();

        enableInfinityScroller();

        component.isImmediateCallback = true;
        fixture.detectChanges();

        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledTimes(1);
        expect(component.infinityScroll['requestCallbackOnScroll']).toHaveBeenCalledTimes(2);
    }));

    it('Immediate callback is TRUE and set it again to TRUE', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        spyOn<any>(component.infinityScroll, 'requestCallbackOnScroll').and.callThrough();

        enableInfinityScroller();

        component.isImmediateCallback = true;
        fixture.detectChanges();

        component.isImmediateCallback = true;
        fixture.detectChanges();

        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledTimes(1);
        expect(component.infinityScroll['requestCallbackOnScroll']).toHaveBeenCalledTimes(2);
    }));

    it('Immediate callback is TRUE and set it to FALSE', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        spyOn<any>(component.infinityScroll, 'requestCallbackOnScroll').and.callThrough();

        enableInfinityScroller();

        component.isImmediateCallback = true;
        fixture.detectChanges();

        component.isImmediateCallback = false;
        fixture.detectChanges();

        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledTimes(1);
        expect(component.infinityScroll['requestCallbackOnScroll']).toHaveBeenCalledTimes(2);
    }));

    it('Set immediate callback to TRUE when infinity scroller not enabled', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        spyOn<any>(component.infinityScroll, 'requestCallbackOnScroll').and.callThrough();

        component.isImmediateCallback = true;
        fixture.detectChanges();

        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
        expect(component.infinityScroll['requestCallbackOnScroll']).not.toHaveBeenCalled();
    }));

    it('Scroll event has NOT occured', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');

        enableInfinityScroller();

        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
    }));

    it('Scroll event has been occured(scroll to bottom 100%)', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        enableInfinityScroller();

        scroll();

        expect(component.onLoadMore).toHaveBeenCalled();
        expect(component.updateData).toHaveBeenCalled();
    }));

    it('Scroll event has been occured (scrolling only to 50%): but request stream was NOT occured', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        enableInfinityScroller();

        scroll(50);

        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
    }));

    it('Scrolling to bottom and than back to top: request stream was occured only one time', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        enableInfinityScroller();

        scroll();

        component.scrollToTop();
        component.myScrollContainer.nativeElement.dispatchEvent(new Event('scroll'));

        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledTimes(1);
    }));

    it('Scroll event has been occured(scroll to middle and than to bottom) with HasNext = TRUE', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');

        // request for new data when scrolled to middle of ul
        component.scrollPercent = 50;
        enableInfinityScroller();

        // scroll to middle
        scroll(50);

        // scroll to bottom
        scroll();

        expect(component.onLoadMore).toHaveBeenCalledTimes(2);
        expect(component.updateData).toHaveBeenCalledTimes(2);
    }));

    it('Scroll event has been occured(scroll to middle and than to bottom) with HasNext = FALSE', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');

        // request for new data when scrolled to middle of ul
        component.scrollPercent = 50;
        component.loader = component.mockLoader(false);
        enableInfinityScroller();

        // scroll to middle
        scroll(50);

        // scroll to bottom
        scroll();

        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledTimes(1);
    }));

    it('Scroll event has been occured(scroll to bottom 100%) but loader function is NULL', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        component.loader = null;
        enableInfinityScroller();

        scroll();

        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
    }));

    it('Scroll event has been occured but onLoadMore function is NULL', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        component.infinityScroll.scrolled = null;
        enableInfinityScroller();

        scroll();

        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).toHaveBeenCalled();
    }));

    it('Scroll event has been occured but updateData function is NULL', async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        component.infinityScroll.updated = null;
        enableInfinityScroller();

        scroll();

        expect(component.onLoadMore).toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
    }));

    function scroll(scrollTopPosition = null) {
        // required dispatch 2 scroll evnts because infinityscroller directive use pairwise operator
        component.myScrollContainer.nativeElement.dispatchEvent(new Event('scroll'));
        component.scrollToBottom(scrollTopPosition);
        component.myScrollContainer.nativeElement.dispatchEvent(new Event('scroll'));
    }

    function enableInfinityScroller() {
        component.enableShowInfiniteScroller();
        fixture.detectChanges();
    }
});