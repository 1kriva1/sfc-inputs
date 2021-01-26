import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CollectionUtils } from '../../../utils/collection-utils';
import { CommonConstants } from '../../../constants/common-constants';
import ILoader from '../../../interfaces/ILoader';

@Injectable({providedIn: 'root'})
export class LoaderService {

  private subject: BehaviorSubject<ILoader[]> = new BehaviorSubject<ILoader[]>([]);

  private loaders$: Observable<ILoader[]> = this.subject.asObservable();

  /**
   * Show loader
   */
  public showLoader(id: string = CommonConstants.GLOBAL_LOADER_ID, register: boolean = false): void {
    this.setLoaderStatus(id, true, register);
  }

  /**
   * Hide loader
   */
  public hideLoader(id: string = CommonConstants.GLOBAL_LOADER_ID): void {
    this.setLoaderStatus(id, false);
  }

  /**
   * Register loader
   */
  public registerLoader(loader: ILoader): Observable<ILoader> {

    const loaders = this.subject.getValue();

    if (!CollectionUtils.hasObjectItem(loaders, 'id', loader.id)) {
      loaders.push(loader);
      this.subject.next(loaders);
    }

    return this.selectLoaderById(loader.id);
  }

  /**
   * Unregister loader
   */
  public removeLoader(id: string = CommonConstants.GLOBAL_LOADER_ID): void {
    const loaders = this.subject.getValue(),
      loaderIndex = loaders.findIndex(loader => loader.id == id);

    if (loaderIndex !== CommonConstants.NOT_FOUND_INDEX) {
      loaders.splice(loaderIndex, 1);
      this.subject.next(loaders);
    }
  }

  private selectLoaderById(id: string): Observable<ILoader> {
    return this.loaders$
      .pipe(
        map(courses => courses.find(course => course.id == id)),
        filter(course => !!course),
        distinctUntilChanged()
      );
  }

  private setLoaderStatus(loaderId: string, loaderIdStatus: boolean, register: boolean = false): void {

    const loaders = this.subject.getValue();

    const loaderIndex = loaders.findIndex(loader => loader.id == loaderId);

    if (loaderIndex !== CommonConstants.NOT_FOUND_INDEX) {

      const newLoader = loaders.slice(0);

      newLoader[loaderIndex] = {
        ...loaders[loaderIndex],
        ...{ id: loaderId, status: loaderIdStatus }
      };

      this.subject.next(newLoader);
    } else {
      if (register) {
        this.registerLoader({ id: loaderId, status: loaderIdStatus });
      }
    }
  }
}