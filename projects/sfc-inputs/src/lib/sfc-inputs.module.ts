import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';
import { InputRefDirective } from './common/input-ref.directive';
import { SfcMaskDirective } from './sfc-mask/sfc-mask.directive';


@NgModule({
  declarations: [TextInputComponent, InputRefDirective, SfcMaskDirective],
  imports: [
    CommonModule
  ],
  exports: [TextInputComponent, InputRefDirective, SfcMaskDirective]
})
export class SfcInputsModule { }
