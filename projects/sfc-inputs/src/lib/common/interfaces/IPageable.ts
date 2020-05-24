import { Observable } from 'rxjs';

export interface IPageable<T> {
    loader: () => Observable<T>;
    onLoadMore(): void;
    updateData(data: T): void;
}