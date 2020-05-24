import { Directive, AfterViewInit, ElementRef, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import { tap } from 'rxjs/operators';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import IScrollPosition from './IScrollPosition';

const DEFAULT_SCROLL_POSITION: IScrollPosition = {
    sH: 0,
    sT: 0,
    cH: 0
};

@Directive({
    selector: '[infinite-scroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

    // scroll Observable
    private scrollEvent$;

    // scroll down Observable
    private userScrolledDown$;

    // http request on scroll Observable
    private requestOnScroll$;

    // indicate if source is empty
    private isSourceEmpty = false;

    // http request on scroll subscription (need for unsubscribe)
    private requestOnScrollSubscription: Subscription

    // loader functon
    @Input()
    loader: () => Observable<ILoadMoreData>;

    // start request immediatly
    _immediateCallback = false;
    
    @Input()
    set immediateCallback(value: boolean) {

        if (!this._immediateCallback && value && this.requestOnScroll$) {
            this.requestOnScrollSubscription.unsubscribe();
            this.requestCallbackOnScroll(true);
        }

        this._immediateCallback = value;
    }

    get immediateCallback() {
        return this._immediateCallback;
    }

    @Input()
    scrollPercent = 70;

    @Input('infinite-scroller')
    infiniteScroller = true;

    @Output()
    updated = new EventEmitter();

    @Output()
    scrolled = new EventEmitter();

    constructor(private elm: ElementRef) { }

    ngAfterViewInit() {
        if (this.infiniteScroller) {
            this.setUpScrollProcess();
        }
    }

    ngOnChanges(changes: SimpleChange) {
        const infiniteScrollerChange = changes["infiniteScroller"],
            immediateCallbackChange = changes["immediateCallback"];

        if (infiniteScrollerChange && !infiniteScrollerChange.firstChange && infiniteScrollerChange.currentValue) {
            this.setUpScrollProcess();
        }
    }

    private setUpScrollProcess() {
        this.registerScrollEvent();

        this.streamScrollEvents();

        this.requestCallbackOnScroll();
    }

    private registerScrollEvent() {
        this.scrollEvent$ = Observable.fromEvent(this.elm.nativeElement, 'scroll');
    }

    private streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$
            .map((e: any): IScrollPosition => ({
                sH: e.target.scrollHeight,
                sT: e.target.scrollTop,
                cH: e.target.clientHeight
            }))
            .pairwise()
            .filter(positions => !this.isSourceEmpty && this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]));
    }

    private requestCallbackOnScroll(lateBinding: boolean = false) {
        this.requestOnScroll$ = this.userScrolledDown$;

        if (this.immediateCallback || lateBinding) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
        }

        this.requestOnScrollSubscription = this.requestOnScroll$
            .exhaustMap(() => {
                if (this.loader) {

                    if (this.scrolled)
                        this.scrolled.emit();

                    let $loadObs = this.loader();

                    return $loadObs ? $loadObs : Observable.empty();
                }

                return Observable.empty();
            })
            .pipe(
                tap((data: ILoadMoreData) => {
                    this.isSourceEmpty = data ? !data.HasNext : this.isSourceEmpty;
                }))
            .subscribe(
                (res: ILoadMoreData) => {
                    if (this.updated)
                        this.updated.emit(res.Items || res);
                }
            );

    }

    private isUserScrollingDown = (positions) => {
        return positions[0].sT < positions[1].sT;
    }

    private isScrollExpectedPercent = (position) => {
        return ((position.sT + position.cH) / position.sH) >= (this.scrollPercent / 100);
    }

}