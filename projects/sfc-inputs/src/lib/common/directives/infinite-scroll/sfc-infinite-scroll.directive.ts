import { Directive, AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import IScrollPosition from './IScrollPosition';
import { CommonUtils } from '../../utils/common-utils';

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
    private isSourceEmpty = false;

    /**
     * Http request on scroll subscription (need for unsubscribe)
     */
    private requestOnScrollSubscription: Subscription

    /**
     * Loader function (return Observable)
     */
    @Input()
    loader: () => Observable<ILoadMoreData<any>>;

    /**
     * Start load data after such value(70 by default persentage) 
     */
    @Input()
    scrollPercent = 70;

    /**
     * If True subscribe to scolling and load data on init
    */
    @Input('infinite-scroller')
    infiniteScroller = true;

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
        if (this.isNeedInitStreams) {
            this.setUpScrollProcess();
        }
    }

    /**
     * Start request for data immediately
     */
    _immediateCallback = false;

    @Input()
    set immediateCallback(value: boolean) {

        if (!this._immediateCallback && value) {
            if (this.isNeedInitStreams) {
                this.setUpScrollProcess(true);
            } else {
                if (this.requestOnScrollSubscription) {
                    this.requestOnScrollSubscription.unsubscribe();
                    this.requestCallbackOnScroll(true);
                }
            }
        }

        this._immediateCallback = value;
    }

    get immediateCallback() {
        return this._immediateCallback;
    }

    private get isNeedInitStreams() {
        return this.infiniteScroller && CommonUtils.isDefined(this.loader) && !CommonUtils.isDefined(this.userScrolledDown$);
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
        this.scrollEvent$ = Observable.fromEvent(this.element.nativeElement, 'scroll', {});
    }

    /**
     * Stream scroll events
     * - allow scroll only down
     * - filtering scroll by expected percentage
     */
    private streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$
            .pipe(distinctUntilChanged())
            .map((e: any): IScrollPosition => ({
                sH: e.target.scrollHeight,
                sT: e.target.scrollTop,
                cH: e.target.clientHeight
            }))
            .pairwise()
            .filter(positions => !this.isSourceEmpty && this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]));
    }

    /**
     * Subscribe to load data on scroll
     * depend to scrollEvent and userScrolledDown streams
     * @param lateBinding - immediate calback was set after directive init
     */
    private requestCallbackOnScroll(lateBinding: boolean = false) {
        this.requestOnScroll$ = this.userScrolledDown$;

        if (this.immediateCallback || lateBinding) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([this.DEFAULT_SCROLL_POSITION, this.DEFAULT_SCROLL_POSITION]);
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
                tap((data: ILoadMoreData<any>) => {
                    this.isSourceEmpty = data ? !data.HasNext : this.isSourceEmpty;
                }))
            .subscribe(
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
        return ((position.sT + position.cH) / position.sH) >= (this.scrollPercent / 100);
    }
}