import { Component, AfterViewInit, ElementRef, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'load-more-button',
    templateUrl: './sfc-load-more-button.component.html',
    styleUrls: ['./sfc-load-more-button.component.css']
})
export class LoadMoreButtonComponent implements AfterViewInit {

    @Input()
    immediateCallback;

    @Input()
    loader: () => Observable<ILoadMoreData>;

    @Output()
    clicked: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    updated: EventEmitter<any> = new EventEmitter<any>();

    private isSourceEmpty = false;

    constructor(private showMoreButton: ElementRef) {

    }

    ngAfterViewInit(): void {

        let mouseDownEvent$ = Observable.fromEvent(this.showMoreButton.nativeElement, 'mousedown');

        if (this.immediateCallback)
            mouseDownEvent$ = mouseDownEvent$.startWith(true);

        mouseDownEvent$
            .filter(_ => !this.isSourceEmpty)
            .pipe(
                tap((event: Event) => {
                    if (event.preventDefault)
                        event.preventDefault();
                }))
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
                tap((data: ILoadMoreData) => {
                    this.isSourceEmpty = data ? !data.HasNext : this.isSourceEmpty;
                }))
            .subscribe((data: ILoadMoreData) => {
                if (this.updated)
                    this.updated.emit(data.Items || data);
            });
    }

}

