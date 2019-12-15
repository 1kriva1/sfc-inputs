import { Directive, Input, OnInit, ElementRef, HostListener } from "@angular/core";
import { SPECIAL_CHARACTERS, TAB, overWriteCharAtPosition, LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE } from "./mask.utils"
import { maskDigitValidators, neverValidator } from './digit_validators';

@Directive({
    selector: '[sfc-mask]'
})
export class SfcMaskDirective implements OnInit {

    @Input('sfc-mask')
    mask: string = '';

    input: HTMLInputElement;

    fullFieldSelected = false;

    constructor(el: ElementRef) {
        this.input = el.nativeElement;
    }

    ngOnInit(): void {
        this.input.value = this.buildPlaceHolder();
    }

    @HostListener('select', ['$event'])
    onSelect($event: UIEvent) {

        this.fullFieldSelected = this.input.selectionStart == 0 &&
            this.input.selectionEnd === this.input.value.length;

    }

    @HostListener('keydown', ['$event', '$event.keyCode'])
    onKeyDown($event: KeyboardEvent, keyCode) {

        if ($event.metaKey || $event.ctrlKey) {
            return;
        }
        
        if (keyCode !== TAB) {
            $event.preventDefault();
        }

        const key = String.fromCharCode(keyCode),
            cursorPosition = this.input.selectionStart;

        if (this.fullFieldSelected) {

            this.input.value = this.buildPlaceHolder();

            const firstPlaceholderPos = this.input.value.indexOf('_');

            this.input.setSelectionRange(firstPlaceholderPos, firstPlaceholderPos);

        }

        switch (keyCode) {

            case LEFT_ARROW:
                this.handleLeftArrow(cursorPosition);
                return;

            case RIGHT_ARROW:
                this.handleRightArrow(cursorPosition);
                return;

            case BACKSPACE:
                this.handleBackspace(cursorPosition);
                return;

            case DELETE:
                this.handleDelete(cursorPosition);
                return;
        }

        const maskDigit = this.mask.charAt(cursorPosition),
            digitValidator = maskDigitValidators[maskDigit] || neverValidator;

        if (digitValidator(key)) {
            overWriteCharAtPosition(this.input, cursorPosition, key);
            this.handleRightArrow(cursorPosition);
        }

    }

    handleLeftArrow(cursorPos) {

        const previousPos = this.calculatePreviousCursorPos(cursorPos);

        if (previousPos >= 0) {
            this.input.setSelectionRange(previousPos, previousPos);
        }
    }

    handleRightArrow(cursorPos) {
        const valueAfterCursor = this.input.value.slice(cursorPos + 1);

        let nextPos = -1;
        var result = valueAfterCursor.split('').find(char => {
            return !SPECIAL_CHARACTERS.includes(char);
        });

        if (result && result.length > 0) {
            nextPos = valueAfterCursor.indexOf(result[0]);
        }

        if (nextPos >= 0) {

            const newCursorPos = cursorPos + nextPos + 1;

            this.input.setSelectionRange(newCursorPos, newCursorPos);
        }
    }

    handleBackspace(cursorPos) {

        const previousPos = this.calculatePreviousCursorPos(cursorPos);

        if (previousPos >= 0) {
            overWriteCharAtPosition(this.input, previousPos, '_');
            this.input.setSelectionRange(previousPos, previousPos);
        }
    }

    handleDelete(cursorPos) {

        if (cursorPos < this.input.value.length) {
            overWriteCharAtPosition(this.input, cursorPos, '_');
            this.input.setSelectionRange(cursorPos, cursorPos);
            //this.handleRightArrow(cursorPos);
        }

    }

    calculatePreviousCursorPos(cursorPos) {
        const valueBeforeCursor = this.input.value.slice(0, cursorPos);
        var result = valueBeforeCursor.split('').reverse().find(char => {
            return !SPECIAL_CHARACTERS.includes(char);
        });

        if (result && result.length > 0) {
            return valueBeforeCursor.lastIndexOf(result[0]);
        }

        return -1;
    }

    buildPlaceHolder(): string {
        const chars = this.mask.split('');

        return chars.reduce((result, char) => {
            return result += SPECIAL_CHARACTERS.includes(char) ? char : '_'
        }, '');
    }
}