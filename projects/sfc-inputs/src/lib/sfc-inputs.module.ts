import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';
import { InputRefDirective } from './common/directives/input-ref.directive';
import { TextAreaInputComponent } from './sfc-text-area-input/sfc-text-area-input.component';
import { FileInputComponent } from './sfc-file-input/sfc-file-input.component';
import { SelectInputComponent } from './sfc-select-input/sfc-select-input.component';
import { CircleLoaderComponent } from './common/components/loader/circle/sfc-circle-loader.component';
import { CircleFadingLoaderComponent } from './common/components/loader/circle-fading/sfc-circle-fading-loader.component';
import { BounceLoaderComponent } from './common/components/loader/bounce/sfc-bounce-loader.component';
import { InfiniteScrollerDirective } from './common/directives/infinite-scroll/sfc-infinite-scroll.directive';
import { LoadMoreButtonComponent } from './common/components/load-more-button/sfc-load-more-button.component';
import { ClickOutside } from './common/directives/clickoutside.directive';
import { CheckboxInputComponent } from './sfc-checkbox-input/sfc-checkbox-input.component';
import { ToggleInputComponent } from './sfc-toggle-input/sfc-toggle-input.component';
import { RadioButtonsInputComponent } from './sfc-radio-buttons-input/sfc-radio-buttons-input.component';
import { TagsInputComponent } from './sfc-tags-input/sfc-tags-input.component';
import { TagsChipComponent } from './sfc-tags-input/sfc-chip/sfc-tags-chip.component';
import { TooltipComponent } from './common/components/tooltip/sfc-tooltip.component';
import { RangeHorizontalInputComponent } from './sfc-range-input/horizontal/sfc-range-horizontal-input.component';
import { RangeVerticalInputComponent } from './sfc-range-input/vertical/sfc-range-vertical-input.component';
import { StarRatingInputComponent } from './sfc-star-rating-input/sfc-star-rating-input.component';
import { StarComponent } from './sfc-star-rating-input/sfc-star/sfc-star.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NumberSpinnerInputComponent } from './sfc-number-spinner-input/sfc-number-spinner-input.component';
import { AutoCompleteInputComponent } from './sfc-autocomplete-input/sfc-autocomplete-input.component';
import { LoadMoreDropDownComponent } from './common/components/load-more-dropdown/sfc-load-more-dropdown.component';
import { SelectItemComponent } from './sfc-select-input/select-item/sfc-select-item.component';
import { AutocompleteItemComponent } from './sfc-autocomplete-input/autocomplete-item/sfc-autocomplete-item.component';
import { DateTimeInputComponent } from './sfc-date-time-input/sfc-date-time-input.component';
import { MouseDownDirective } from './common/directives/mouse-down.directive';
import { ButtonComponent } from './common/components/button/sfc-button.component';
import { DateTimeCalendarComponent } from './sfc-date-time-input/calendar/sfc-date-time-calendar.component';
import { DateTimeClockComponent } from './sfc-date-time-input/clock/sfc-date-time-clock.component';
import { DateTimeYearComponent } from './sfc-date-time-input/year-picker/sfc-date-time-year.component';
import { PhotoInputComponent } from './sfc-photo-input/sfc-photo-input.component';
import { InputModalComponent } from './common/components/modal/sfc-modal.component';
import { PhotoEditorComponent } from './sfc-photo-input/sfc-photo-editor/sfc-photo-editor.component';
import BaseInputComponent from './common/components/sfc-base-input.component';

@NgModule({
  declarations: [InputRefDirective, MouseDownDirective, CircleLoaderComponent, CircleFadingLoaderComponent, BounceLoaderComponent, ButtonComponent, InputModalComponent, 
    PhotoEditorComponent,
    TextInputComponent, TextAreaInputComponent, FileInputComponent, SelectInputComponent, CheckboxInputComponent, ToggleInputComponent, RadioButtonsInputComponent, 
    TagsInputComponent, TagsChipComponent, RangeHorizontalInputComponent, RangeVerticalInputComponent, StarRatingInputComponent, StarComponent,
    InfiniteScrollerDirective, ClickOutside, LoadMoreButtonComponent, TooltipComponent, NumberSpinnerInputComponent, AutoCompleteInputComponent, LoadMoreDropDownComponent, 
    SelectItemComponent, AutocompleteItemComponent, DateTimeInputComponent, DateTimeCalendarComponent, DateTimeClockComponent, DateTimeYearComponent, PhotoInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [TextInputComponent, TextAreaInputComponent, FileInputComponent, SelectInputComponent, CheckboxInputComponent, ToggleInputComponent, RadioButtonsInputComponent,
    TagsInputComponent, TagsChipComponent, RangeHorizontalInputComponent, RangeVerticalInputComponent, CircleLoaderComponent, CircleFadingLoaderComponent, BounceLoaderComponent, LoadMoreButtonComponent, 
    InfiniteScrollerDirective, TooltipComponent, StarRatingInputComponent, StarComponent, NumberSpinnerInputComponent, AutoCompleteInputComponent, LoadMoreDropDownComponent,
    DateTimeInputComponent, PhotoInputComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    // HttpUtils,
    // LoaderService
  ]
})
export class SfcInputsModule { }