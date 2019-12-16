import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './sfc-text-input/sfc-text-input.component';


@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule
  ],
  exports: [TextInputComponent]
})
export class SfcInputsModule { }
