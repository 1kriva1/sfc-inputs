import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';
import { InputRefDirective } from './common/directives/input-ref.directive';


@NgModule({
  declarations: [TextInputComponent, InputRefDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TextInputComponent, InputRefDirective],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => TextInputComponent), multi: true}]
})
export class SfcInputsModule { }
