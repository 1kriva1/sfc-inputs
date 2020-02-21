import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';
import { InputRefDirective } from './common/directives/input-ref.directive';
import { TextAreaInputComponent } from './sfc-text-area-input/sfc-text-area-input.component';
import TextBaseInputComponent from './common/components/sfc-base-input.component';
import { FileInputComponent } from './sfc-file-input/sfc-file-input.component';
import { FileUtils } from './common/utils/file-utils';
import { SelectInputComponent } from './sfc-select-input/sfc-select-input.component';

@NgModule({
  declarations: [InputRefDirective, TextInputComponent, TextAreaInputComponent, FileInputComponent, SelectInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TextInputComponent, TextAreaInputComponent, FileInputComponent, SelectInputComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextBaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TextBaseInputComponent), multi: true },
    FileUtils
  ]
})
export class SfcInputsModule { }