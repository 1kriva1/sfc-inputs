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

@NgModule({
  declarations: [InputRefDirective, CircleLoaderComponent, CircleFadingLoaderComponent, BounceLoaderComponent, TextInputComponent, TextAreaInputComponent, 
    FileInputComponent, SelectInputComponent, CheckboxInputComponent, InfiniteScrollerDirective, ClickOutside, LoadMoreButtonComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TextInputComponent, TextAreaInputComponent, FileInputComponent, SelectInputComponent, CheckboxInputComponent, CircleLoaderComponent, 
    CircleFadingLoaderComponent, BounceLoaderComponent, LoadMoreButtonComponent, InfiniteScrollerDirective],
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