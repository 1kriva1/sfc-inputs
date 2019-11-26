import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TextInputComponent } from '../../projects/sfc-inputs/src/lib/sfc-text-input/sfc-text-input.component';
import {SfcInputsModule} from '../../projects/sfc-inputs/src/lib/sfc-inputs.module'

@NgModule({
    imports: [BrowserModule, FormsModule, SfcInputsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }