import { Component, Input, Output, EventEmitter } from '@angular/core';
import IAutoCompleteData from '../../common/interfaces/autocomplete-input/IAutoCompleteData';

@Component({
    selector: 'sfc-autocomplete-item',
    templateUrl: './sfc-autocomplete-item.component.html',
    styleUrls: ['./sfc-autocomplete-item.component.css', './sfc-autocomplete-item-dark-theme.component.css']
})
export class AutocompleteItemComponent {

    @Input()
    item: IAutoCompleteData;

    @Output('selected')
    selected: EventEmitter<any> = new EventEmitter<any>();

    private selectedHandler(): void {
        if (this.selected)
            this.selected.emit(this.item);
    }
}