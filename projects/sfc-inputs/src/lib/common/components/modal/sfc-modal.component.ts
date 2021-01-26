import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { StyleClass } from '../../constants/common-constants';

@Component({
    selector: 'sfc-modal',
    templateUrl: './sfc-modal.component.html',
    styleUrls: ['./sfc-modal.component.css', './sfc-modal-dark-theme.component.css']
})
export class InputModalComponent {

    @Input()
    @HostBinding('class.' + StyleClass.Active)
    show: boolean = false;

    @Output()
    closed: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    ok: EventEmitter<void> = new EventEmitter<void>();

    onClose() {
        this.closed.emit();
    }

    onOk() {
        this.ok.emit();
    }
}