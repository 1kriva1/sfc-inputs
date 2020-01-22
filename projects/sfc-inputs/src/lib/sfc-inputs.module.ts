import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';
import { InputRefDirective } from './common/directives/input-ref.directive';
import { TextAreaInputComponent } from './sfc-text-area-input/sfc-text-area-input.component';
import TextBaseInputComponent from './common/interfaces/sfc-text-base.component';


@NgModule({
  declarations: [TextInputComponent, InputRefDirective, TextAreaInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TextInputComponent, InputRefDirective, TextAreaInputComponent],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextBaseInputComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => TextBaseInputComponent), multi: true}]
})
export class SfcInputsModule { }
