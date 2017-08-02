import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingBarService {
    pending = new Subject();
    private _pendingRequests: number = 0;

    public startLoading(source$?: Observable<any>) {
        if (source$) {
            source$.share().subscribe(this.getLoadingObserver());
        }
        this.pending.next({
            started: this._pendingRequests === 0,
            pendingRequests: ++this._pendingRequests
        });
    }

    public endLoading() {
        this.pending.next({
            completed: this._pendingRequests === 1,
            pendingRequests: --this._pendingRequests
        });
    }

    public getLoadingObserver(): Observer<any> {
        return {
            next: (x) => x,
            error: (err) => this.endLoading(),
            complete: () => this.endLoading()
        };
    }
}
