import { TextInputAppComponent } from './text-input-app/text-input.component';
import { Route } from "@angular/router";
import { TextAreaAppComponent } from './text-area-app/text-area.component';

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
    fallbackRoute,
    indexRoute
];