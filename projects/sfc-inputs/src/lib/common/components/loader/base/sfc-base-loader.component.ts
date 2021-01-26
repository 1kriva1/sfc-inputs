import { Input, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { ComponentSizeType, CommonConstants, StyleClass } from '../../../constants/common-constants';
import ISize from '../../../interfaces/ISize';
import { LoaderService } from './sfc-loader.service';
import ILoader from '../../../interfaces/ILoader';
import { UIUtils } from '../../../utils/ui-utils';

export default abstract class BaseLoaderComponent implements OnInit {

  /**
   * Loader identificator (global by default)
   */
  @Input()
  id: string = CommonConstants.GLOBAL_LOADER_ID;

  /**
   * Is start on init (loader register with show = True)
   */
  @Input()
  start: boolean = false;

  /**
   * Loader when active(show) has background(low opacity)
   */
  @Input()
  background: boolean = true;

  /**
   * Predefined loader sizes(small, medium and large)
   */
  @Input()
  size: ComponentSizeType = ComponentSizeType.Medium;

  /**
   * Loader can has custom size (width aand height)
   */
  @Input()
  public customSize: ISize;

  constructor(protected document: Document, protected renderer: Renderer2,
    protected loaderService: LoaderService) {
  }

  // Indicate show or hide loader (and set class to host element)
  @HostBinding('class.' + StyleClass.Loading)
  show: boolean = false;

  public ngOnInit(): void {

    // register new loader
    this.loaderService.registerLoader({ id: this.id, status: this.start }).subscribe((response: ILoader) => {
      this.show = response && this.id === response.id && response.status;
      if (this.id == CommonConstants.GLOBAL_LOADER_ID)
        this.setGlobalLoaderStyles();
    });
  }

  get preLoaderClass() {
    let classes = {};

    if (this.id === CommonConstants.GLOBAL_LOADER_ID)
      classes[CommonConstants.GLOBAL_LOADER_ID] = true;
    else
      classes[CommonConstants.SECONDARY_LOADER_ID] = true;

    classes[CommonConstants.CSS_CLASS_BACKGROUND] = this.background;

    return classes;
  }

  get loaderClass() {
    if (this.customSize)
      return null;

    let classes = {};
    classes[this.size] = true;

    return classes;
  }

  get loaderStyle() {
    return this.customSize ?
      {
        width: UIUtils.getCssLikePx(this.customSize.width),
        height: UIUtils.getCssLikePx(this.customSize.height)
      }
      : null;
  }

  private setGlobalLoaderStyles() {
    if (this.show) {
      this.renderer.setStyle(this.document.body, CommonConstants.CSS_CLASS_TOP, UIUtils.getCssLikePx(-document.documentElement.scrollTop));
      this.renderer.addClass(this.document.body, CommonConstants.CSS_CLASS_FIXED);
    } else {
      this.renderer.removeClass(this.document.body, CommonConstants.CSS_CLASS_FIXED);
      document.documentElement.scrollTop = -parseInt(this.document.body.style.top, 10);
      this.renderer.removeStyle(this.document.body, CommonConstants.CSS_CLASS_TOP)
    }
  }
}