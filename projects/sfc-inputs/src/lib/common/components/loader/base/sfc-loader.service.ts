import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ILoader } from '../../../interfaces/ILoader';
import { CollectionUtils } from '../../../utils/collection-utils';
import { CommonConstants } from '../../../constants/common-constants';

@Injectable()
export class LoaderService {

  private subject: BehaviorSubject<ILoader[]> = new BehaviorSubject<ILoader[]>([]);

  private loaders$: Observable<ILoader[]> = this.subject.asObservable();

  constructor(private collectionUtils: CollectionUtils) {
  }

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
   * Hide loader
   * @param {ILoader} loader
   */
  public registerLoader(loader: ILoader): void {

    const loaders = this.subject.getValue();

    if (!this.collectionUtils.hasObjectItem(loaders, "id", loader.id)) {
      loaders.push(loader);
      this.subject.next(loaders);
    }
  }

  public selectLoaderById(id: string) {
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

    const newLoader = loaders.slice(0);

    newLoader[loaderIndex] = {
      ...loaders[loaderIndex],
      ...{ id: loaderId, status: loaderIdStatus }
    };

    this.subject.next(newLoader);
  }
}