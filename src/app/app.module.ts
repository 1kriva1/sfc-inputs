import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {SfcInputsModule} from '../../projects/sfc-inputs/src/lib/sfc-inputs.module';
import { RouterModule } from '@angular/router';
import { routeConfig } from 'src/router-config';
import { TextInputAppComponent } from 'src/text-input-app/text-input.component';
import { TextAreaAppComponent } from 'src/text-area-app/text-area.component';
import { FileInputAppComponent } from 'src/file-input-app/file-input.component';
import { SelectInputAppComponent } from 'src/select-input-app/select-input.component';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routeConfig), SfcInputsModule],
    declarations: [AppComponent, TextInputAppComponent, TextAreaAppComponent, FileInputAppComponent, SelectInputAppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }