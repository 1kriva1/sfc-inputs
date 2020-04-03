import { Component, Inject, Renderer2 } from '@angular/core';
import BaseLoaderComponent from '../base/sfc-base-loader.component';
import { LoaderService } from '../base/sfc-loader.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-circle-loader',
  templateUrl: './sfc-circle-loader.component.html',
  styleUrls: ['../base/sfc-base-loader.component.css', './sfc-circle-loader.component.css', '../base/sfc-base-loader-dark-theme.component.css']
})
export class CircleLoaderComponent extends BaseLoaderComponent {

  constructor(@Inject(DOCUMENT) protected document: Document,
    protected renderer: Renderer2, protected loaderService: LoaderService) {
    super(document, renderer, loaderService);
  }
}