import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';
import { InputRefDirective } from './common/directives/input-ref.directive';
import { TextAreaInputComponent } from './sfc-text-area-input/sfc-text-area-input.component';
import BaseInputComponent from './common/components/sfc-base-input.component';
import { FileInputComponent } from './sfc-file-input/sfc-file-input.component';
import { FileUtils } from './common/utils/file-utils';
import { SelectInputComponent } from './sfc-select-input/sfc-select-input.component';
import { CollectionUtils } from './common/utils/collection-utils';
import { UIUtils } from './common/utils/ui-utils';
import { LoaderService } from './common/components/loader/base/sfc-loader.service';
import { CircleLoaderComponent } from './common/components/loader/circle/sfc-circle-loader.component';
import { CircleFadingLoaderComponent } from './common/components/loader/circle-fading/sfc-circle-fading-loader.component';
import { BounceLoaderComponent } from './common/components/loader/bounce/sfc-bounce-loader.component';
import { InfiniteScrollerDirective } from './common/directives/infinite-scroll/sfc-infinite-scroll.directive';
import { LoadMoreButtonComponent } from './common/components/load-more-button/sfc-load-more-button.component';
import { ClickOutside } from './common/directives/clickoutside.directive';
import HttpUtils from './common/utils/http-utils';
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

@NgModule({
  declarations: [InputRefDirective, CircleLoaderComponent, CircleFadingLoaderComponent, BounceLoaderComponent, TextInputComponent, TextAreaInputComponent,
    FileInputComponent, SelectInputComponent, CheckboxInputComponent, ToggleInputComponent, RadioButtonsInputComponent, TagsInputComponent, TagsChipComponent, 
    RangeHorizontalInputComponent, RangeVerticalInputComponent, StarRatingInputComponent, StarComponent,
    InfiniteScrollerDirective, ClickOutside, LoadMoreButtonComponent, TooltipComponent, NumberSpinnerInputComponent, AutoCompleteInputComponent, LoadMoreDropDownComponent, 
    SelectItemComponent, AutocompleteItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [TextInputComponent, TextAreaInputComponent, FileInputComponent, SelectInputComponent, CheckboxInputComponent, ToggleInputComponent, RadioButtonsInputComponent,
    TagsInputComponent, TagsChipComponent, RangeHorizontalInputComponent, RangeVerticalInputComponent, CircleLoaderComponent, CircleFadingLoaderComponent, BounceLoaderComponent, LoadMoreButtonComponent, 
    InfiniteScrollerDirective, TooltipComponent, StarRatingInputComponent, StarComponent, NumberSpinnerInputComponent, AutoCompleteInputComponent, LoadMoreDropDownComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    FileUtils,
    CollectionUtils,
    UIUtils,
    HttpUtils,
    LoaderService
  ]
})
export class SfcInputsModule { }