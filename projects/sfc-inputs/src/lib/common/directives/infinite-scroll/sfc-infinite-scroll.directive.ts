import { Directive, AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import IScrollPosition from './IScrollPosition';
import { CommonUtils } from '../../utils/common-utils';
import { EMPTY, fromEvent, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, exhaustMap, filter, map, pairwise, startWith } from 'rxjs/operators';

@Directive({
    selector: '[infinite-scroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

    /**
     * Default scroll position
     */
    private readonly DEFAULT_SCROLL_POSITION: IScrollPosition = {
        sH: 0,
        sT: 0,
        cH: 0
    };

    /**
     * Scroll Observable 
     */
    private scrollEvent$;

    /**
     * Scroll down Observable 
     */
    private userScrolledDown$;

    /**
     * Http request on scroll Observable
     */
    private requestOnScroll$;

    /**
     * If ILoadMoreData HasNext is false it means that we need stop load data on scroll
     */
    @Input('has-more')
    hasMore = true;

    /**
     * Http request on scroll subscription (need for unsubscribe)
     */
    private requestOnScrollSubscription: Subscription

    /**
     * Loader function (return Observable)
     */
    @Input()
    loader: (parameters?: any) => Observable<ILoadMoreData<any>>;

    /**
     * Start load data after such value(70 by default persentage) 
     */
    @Input()
    scrollPercent = 70;

    /**
     * If True subscribe to scrolling and load data on init
    */
    _infiniteScroller = true;

    @Input('infinite-scroller')
    set infiniteScroller(value: boolean) {

        if (value) {
            if (CommonUtils.isDefined(this.requestOnScrollSubscription) && CommonUtils.isDefined(this.loader)) {
                this.requestOnScrollSubscription.unsubscribe();
                this.requestCallbackOnScroll(true);
            } else {
                this.setUpScrollProcess();
            }
        }

        this._infiniteScroller = value;
    }

    get infiniteScroller() {
        return this._infiniteScroller;
    }

    /**
     * Start request for data immediately
     */
    _immediateCallback = false;

    @Input()
    set immediateCallback(value: boolean) {

        if (value && this.infiniteScroller) {
            if (CommonUtils.isDefined(this.requestOnScrollSubscription) && CommonUtils.isDefined(this.loader)) {
                this.requestOnScrollSubscription.unsubscribe();
                this.requestCallbackOnScroll(true);
            } else {
                this.setUpScrollProcess();
            }
        }

        this._immediateCallback = value;
    }

    get immediateCallback() {
        return this._immediateCallback;
    }

    /**
     * Called when scrolled(before load data)
     */
    @Output()
    scrolled: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Called when data were loaded
     */
    @Output()
    updated: EventEmitter<any> = new EventEmitter<any>();

    constructor(private element: ElementRef) { }

    ngAfterViewInit() {
        if (this.infiniteScroller && !CommonUtils.isDefined(this.requestOnScrollSubscription)) {
            this.setUpScrollProcess();
        }
    }

    /**
     * Register scroll event
     * Stream scroll events
     * Subscribe to load data
     */
    private setUpScrollProcess(lateBinding: boolean = false) {
        this.registerScrollEvent();
        this.streamScrollEvents();
        this.requestCallbackOnScroll(lateBinding);
    }

    /**
     * Register scroll event
     */
    private registerScrollEvent() {
        this.scrollEvent$ = fromEvent(this.element.nativeElement, 'scroll', {});
    }

    /**
     * Stream scroll events
     * - allow scroll only down
     * - filtering scroll by expected percentage
     */
    private streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$
            .pipe(
                distinctUntilChanged(),
                map((e: any): IScrollPosition => ({
                    sH: e.target.scrollHeight,
                    sT: e.target.scrollTop,
                    cH: e.target.clientHeight
                })),
                pairwise(),
                filter(positions => {
                    return this.hasMore && this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])
                }));
    }

    /**
     * Subscribe to load data on scroll
     * depend to scrollEvent and userScrolledDown streams
     * @param lateBinding - immediate calback was set after directive init
     */
    private requestCallbackOnScroll(lateBinding: boolean = false) {
        this.requestOnScroll$ = this.userScrolledDown$;

        if (this.immediateCallback || lateBinding) {
            this.requestOnScroll$ = this.requestOnScroll$.pipe(
                startWith([this.DEFAULT_SCROLL_POSITION, this.DEFAULT_SCROLL_POSITION])
            );
        }

        this.requestOnScrollSubscription = this.requestOnScroll$
            .pipe(
                exhaustMap(() => {
                    if (this.loader) {

                        if (this.scrolled)
                            this.scrolled.emit();

                        let $loadObs = this.loader();

                        return $loadObs ? $loadObs : EMPTY;
                    }

                    return EMPTY;
                })
            ).subscribe(
                (data: ILoadMoreData<any>) => {
                    if (this.updated)
                        this.updated.emit(data);
                }
            );
    }

    /**
     * Detect if user scrolling down
     * @param positions - positions of current and previus scroll events
     */
    private isUserScrollingDown = (positions) => {
        return positions[0].sT < positions[1].sT;
    }

    /**
     * Detect if scroll reach expected percentage
     * @param position - positions of current and previus scroll events
     */
    private isScrollExpectedPercent = (position) => {
        return Number(((position.sT + position.cH) / position.sH).toFixed(2)) >= (this.scrollPercent / 100);
    }
}