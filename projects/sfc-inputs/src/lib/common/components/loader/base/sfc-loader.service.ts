import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CollectionUtils } from '../../../utils/collection-utils';
import { CommonConstants } from '../../../constants/common-constants';
import ILoader from '../../../interfaces/ILoader';

@Injectable()
export class LoaderService {

  private subject: BehaviorSubject<ILoader[]> = new BehaviorSubject<ILoader[]>([]);

  private loaders$: Observable<ILoader[]> = this.subject.asObservable();

  /**
   * Show loader
   * @param {string} id
   */
  public showLoader(id: string = CommonConstants.GLOBAL_LOADER_ID): void {
    this.setLoaderStatus(id, true);
  }

  /**
   * Hide loader
   * @param {string} id
   */
  public hideLoader(id: string = CommonConstants.GLOBAL_LOADER_ID): void {
    this.setLoaderStatus(id, false);
  }

  /**
   * Register loader
   * @param {ILoader} loader
   */
  public registerLoader(loader: ILoader): void {

    const loaders = this.subject.getValue();

    if (!CollectionUtils.hasObjectItem(loaders, 'id', loader.id)) {
      loaders.push(loader);
      this.subject.next(loaders);
    }
  }

  /**
   * Unregister loader
   * @param {ILoader} loader
   */
  public removeLoader(loader: ILoader): void {
    const loaders = this.subject.getValue(),
      loaderIndex = loaders.findIndex(loader => loader.id == loader.id);

    if (loaderIndex !== CommonConstants.NOT_FOUND_INDEX) {
      loaders.splice(loaderIndex, 1);
      this.subject.next(loaders);
    }
  }

  /**
   * Return loader's observable by id
   * @param {string} id
   */
  public selectLoaderById(id: string): Observable<ILoader> {
    return this.loaders$
      .pipe(
        map(courses => courses.find(course => course.id == id)),
        filter(course => !!course),
        distinctUntilChanged()
      );
  }

  private setLoaderStatus(loaderId: string, loaderIdStatus: boolean) {

    const loaders = this.subject.getValue();

    const loaderIndex = loaders.findIndex(loader => loader.id == loaderId);

    if (loaderIndex === CommonConstants.NOT_FOUND_INDEX) {

      this.registerLoader({ id: loaderId, status: loaderIdStatus })

    } else {
      const newLoader = loaders.slice(0);

      newLoader[loaderIndex] = {
        ...loaders[loaderIndex],
        ...{ id: loaderId, status: loaderIdStatus }
      };

      this.subject.next(newLoader);
    }
  }
}