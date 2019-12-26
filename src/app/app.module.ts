import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {SfcInputsModule} from '../../projects/sfc-inputs/src/lib/sfc-inputs.module';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, SfcInputsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }