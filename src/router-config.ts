import { TextInputAppComponent } from './text-input-app/text-input.component';
import { Route } from "@angular/router";
import { TextAreaAppComponent } from './text-area-app/text-area.component';
import { FileInputAppComponent } from './file-input-app/file-input.component';
import { SelectInputAppComponent } from './select-input-app/select-input.component';
import { LoaderAppComponent } from './loader-app/loader.component';
import { CheckboxInputAppComponent } from './checkbox-input-app/checkbox-input.component';
import { ToggleInputAppComponent } from './toggle-input-app/toggle-input.component';
import { RadioButtonsInputAppComponent } from './radio-buttons-app/radio-buttons-input.component';
import { TagsInputAppComponent } from './tags-input-app/tags-input.component';
import { RangeInputAppComponent } from './range-input-app/range-input.component';
import { ToolTipAppComponent } from './tooltip-app/tooltip.component';

const indexRoute: Route = {
    path: "",
    component: TextInputAppComponent
};

const fallbackRoute: Route = {
    path: '**',
    component: TextInputAppComponent
};

export const routeConfig = [
    {
        path: 'text-input',
        component: TextInputAppComponent
    },
    {
        path: 'text-area',
        component: TextAreaAppComponent
    },
    {
        path: 'file-input',
        component: FileInputAppComponent
    },
    {
        path: 'select-input',
        component: SelectInputAppComponent
    },
    {
        path: 'checkbox-input',
        component: CheckboxInputAppComponent
    },
    {
        path: 'toggle-input',
        component: ToggleInputAppComponent
    },
    {
        path: 'radio-buttons-input',
        component: RadioButtonsInputAppComponent
    },
    {
        path: 'tags-input',
        component: TagsInputAppComponent
    },
    {
        path: 'range-input',
        component: RangeInputAppComponent
    },
    {
        path: 'loader',
        component: LoaderAppComponent
    },
    {
        path: 'tooltip',
        component: ToolTipAppComponent
    },
    fallbackRoute,
    indexRoute
];