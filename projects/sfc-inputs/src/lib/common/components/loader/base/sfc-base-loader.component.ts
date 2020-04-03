import { Input, HostBinding, OnInit, Inject, Renderer2 } from '@angular/core';
import { ComponentSizeType, CommonConstants } from '../../../constants/common-constants';
import ISize from '../../../interfaces/ISize';
import { LoaderService } from './sfc-loader.service';
import { ILoader } from '../../../interfaces/ILoader';
import { UIUtils } from '../../../utils/ui-utils';
import { DOCUMENT } from '@angular/common';

export default abstract class BaseLoaderComponent implements OnInit {

  @Input()
  public id: string = CommonConstants.GLOBAL_LOADER_ID;

  @Input()
  public start: boolean = false;

  @Input()
  public background: boolean = true;

  @Input()
  public size: ComponentSizeType = ComponentSizeType.Medium;

  @Input()
  public customSize: ISize;

  constructor(protected document: Document, protected renderer: Renderer2, protected loaderService: LoaderService) {
  }

  public ngOnInit(): void {

    this.loaderService.registerLoader({ id: this.id, status: this.start });

    this.loaderService.selectLoaderById(this.id)
      .subscribe((response: ILoader) => {
        this.show = response && this.id === response.id && response.status;

        if (this.id == CommonConstants.GLOBAL_LOADER_ID) {
          this.setGlobalLoaderStyles();
        }
      });
  }

  @HostBinding('class.loading')
  show: boolean = false;

  get circleSizeClass() {
    if (this.customSize)
      return;

    let classes = {};
    classes[this.size] = true;

    return classes;
  }

  get circleSizeStyle() {
    return this.customSize
      ? {
        width: UIUtils.getCssLikePx(this.customSize.width),
        height: UIUtils.getCssLikePx(this.customSize.height)
      }
      : null;
  }

  private setGlobalLoaderStyles() {
    if (this.show) {
      this.renderer.setStyle(this.document.body, 'top', UIUtils.getCssLikePx(-document.documentElement.scrollTop));
      this.renderer.addClass(this.document.body, CommonConstants.CSS_CLASS_FIXED);      
    } else {
      this.renderer.removeClass(this.document.body, CommonConstants.CSS_CLASS_FIXED);
      document.documentElement.scrollTop = -parseInt(this.document.body.style.top, 10);
      this.renderer.removeStyle(this.document.body, 'top')
    }
  }
}