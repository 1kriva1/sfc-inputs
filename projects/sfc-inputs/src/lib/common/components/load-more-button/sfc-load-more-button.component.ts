import { Component, AfterViewInit, ElementRef, Input, Output, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { EventEmitter } from '@angular/core';
import { CollectionUtils } from '../../utils/collection-utils';

@Component({
    selector: 'load-more-button',
    templateUrl: './sfc-load-more-button.component.html',
    styleUrls: ['./sfc-load-more-button.component.css']
})
export class LoadMoreButtonComponent implements AfterViewInit {

    /**
     * Start load more on init (before click on button)
     */
    @Input('load-on-init')
    immediateCallback;

    /**
     * Loader function (return Observable)
     */
    @Input()
    loader: () => Observable<ILoadMoreData<any>>;

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

    /**
     * If ILoadMoreData HasNext is false it means that we need hide load more button
     */
    private isSourceEmpty = false;

    /**
     * TODO? move hr deliminator to parent components
     */
    private hasData = false;

    @ViewChild('showMoreButton', { static: false })
    private showMoreButton: ElementRef;

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        if (event.preventDefault)
            event.preventDefault();
    }

    ngAfterViewInit(): void {

        let mouseDownEvent$ = Observable.fromEvent(this.showMoreButton.nativeElement, 'mousedown');

        if (this.immediateCallback)
            mouseDownEvent$ = mouseDownEvent$.startWith(true);

        mouseDownEvent$
            .filter(_ => !this.isSourceEmpty)
            .exhaustMap(() => {
                if (this.loader) {

                    if (this.clicked)
                        this.clicked.emit();

                    const $loadObs = this.loader();

                    return $loadObs ? $loadObs : Observable.empty();
                }

                return Observable.empty();
            })
            .pipe(
                tap((data: ILoadMoreData<any>) => {
                    this.isSourceEmpty = data ? !data.HasNext : this.isSourceEmpty;
                    this.hasData = data ? !this.isSourceEmpty && CollectionUtils.any(data.Items) : false;
                }))
            .subscribe((data: ILoadMoreData<any>) => {
                if (this.updated)
                    this.updated.emit(data);
            });
    }
}