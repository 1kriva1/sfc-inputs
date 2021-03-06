import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Directive({
    selector: '[mouse-down-left]'
})

export class MouseDownDirective {

    @Output('mouse-down-left')
    action: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @HostListener('mousedown', ['$event']) onMouseDown($event: MouseEvent) {
        if ($event) {
            if ($event.button === 0) {
                if (this.action) {
                    this.action.emit($event);
                }
            }
            else {
                $event.preventDefault();
            }
        } else {
            if (this.action) {
                this.action.emit($event);
            }
        }
    }
}
