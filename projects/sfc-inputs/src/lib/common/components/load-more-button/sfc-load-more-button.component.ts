import { Component, AfterViewInit, ElementRef, Input, Output, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { EventEmitter } from '@angular/core';
import { CommonUtils } from '../../utils/common-utils';

@Component({
    selector: 'load-more-button',
    templateUrl: './sfc-load-more-button.component.html',
    styleUrls: ['./sfc-load-more-button.component.css', './sfc-load-more-button-dark-theme.component.css']
})
export class LoadMoreButtonComponent implements AfterViewInit {

    /**
     * Start load more on init (before click on button)
     */
    @Input('load-on-init')
    immediateCallback;

    @Input('has-more')
    hasMore = true;

    /**
     * Loader function (return Observable)
     */
    @Input()
    loader: (parameters?: any) => Observable<ILoadMoreData<any>>;

    /**
     * Called when button was clicked(before load data)
     */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Called when data were loaded
     */
    @Output()
    updated: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('showMoreButton', { static: false })
    private showMoreButton: ElementRef;

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        if (event.preventDefault)
            event.preventDefault();
    }

    ngAfterViewInit(): void {

        if (CommonUtils.isDefined(this.showMoreButton)) {
            let mouseDownEvent$ = Observable.fromEvent(this.showMoreButton.nativeElement, 'click');

            if (this.immediateCallback)
                mouseDownEvent$ = mouseDownEvent$.startWith(true);

            mouseDownEvent$
                .filter(_ => this.hasMore)
                .exhaustMap(() => {
                    if (this.loader) {

                        if (this.clicked)
                            this.clicked.emit();

                        const $loadObs = this.loader();

                        return $loadObs ? $loadObs : Observable.empty();
                    }

                    return Observable.empty();
                })
                .subscribe((data: ILoadMoreData<any>) => {
                    if (this.updated)
                        this.updated.emit(data);
                });
        }
    }
}