import { Component, Inject, Renderer2 } from '@angular/core';
import BaseLoaderComponent from '../base/sfc-base-loader.component';
import { LoaderService } from '../base/sfc-loader.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-circle-fading-loader',
  templateUrl: './sfc-circle-fading-loader.component.html',
  styleUrls: ['../base/sfc-base-loader.component.css', './sfc-circle-fading-loader.component.css', '../base/sfc-base-loader-dark-theme.component.css']
})
export class CircleFadingLoaderComponent extends BaseLoaderComponent {

  constructor(@Inject(DOCUMENT) protected document: any,
    protected renderer: Renderer2, protected loaderService: LoaderService) {
    super(document, renderer, loaderService);
  }
}