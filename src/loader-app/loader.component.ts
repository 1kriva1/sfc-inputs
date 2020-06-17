import { Component, Inject } from '@angular/core';
import { LoaderService } from 'projects/sfc-inputs/src/lib/common/components/loader/base/sfc-loader.service';
import ISize from 'projects/sfc-inputs/src/lib/common/interfaces/ISize';

@Component({
    selector: 'loader-app',
    templateUrl: './loader.component.html',
    styleUrls: [
        '../app/app.component.css',
        './loader.component.css'
    ]
})
export class LoaderAppComponent {
    private theme: string = "common";

    private customSize: ISize = { width: 80, height: 80 };

    constructor(private loaderService: LoaderService) {

    }

    /**
   * Show loader
   * @param type
   */
    public showLoader(id?: string): void {
        this.loaderService.showLoader(id);

        // hide global loader after 3 sec
        if(!id){
            setTimeout(() => {
                this.hideLoader()
            }, 3000);            
        }
    }

    /**
     * Hide loader
     */
    public hideLoader(id?: string): void {
        this.loaderService.hideLoader(id);
    }
}