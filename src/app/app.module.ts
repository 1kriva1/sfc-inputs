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
import { LoaderAppComponent } from 'src/loader-app/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxInputAppComponent } from 'src/checkbox-input-app/checkbox-input.component';
import { ToggleInputAppComponent } from 'src/toggle-input-app/toggle-input.component';
import { RadioButtonsInputAppComponent } from 'src/radio-buttons-app/radio-buttons-input.component';
import { TagsInputAppComponent } from 'src/tags-input-app/tags-input.component';
import { RangeInputAppComponent } from 'src/range-input-app/range-input.component';
import { ToolTipAppComponent } from 'src/tooltip-app/tooltip.component';
import { StarRatingInputAppComponent } from 'src/star-rating-app/star-rating-input.component';
import { NumberSpinnerInputAppComponent } from 'src/number-spinner-app/number-spinner-input.component';
import { AutoCompleteInputAppComponent } from 'src/autocomplete-input-app/autocomplete-input.component';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,  HttpClientModule, RouterModule.forRoot(routeConfig), SfcInputsModule],
    declarations: [AppComponent, TextInputAppComponent, TextAreaAppComponent, FileInputAppComponent, SelectInputAppComponent, LoaderAppComponent, CheckboxInputAppComponent,
        ToggleInputAppComponent, RadioButtonsInputAppComponent, TagsInputAppComponent, RangeInputAppComponent, ToolTipAppComponent, StarRatingInputAppComponent,
        NumberSpinnerInputAppComponent, AutoCompleteInputAppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }