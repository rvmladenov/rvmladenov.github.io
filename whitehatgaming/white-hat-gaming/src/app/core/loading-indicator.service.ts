import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
    private readonly id = 'loading-indicator';
    public showLoadingIndicator$ = new BehaviorSubject(true);

    show() {
        this.showLoadingIndicator$.next(true);
    }
    
    hide() {
        setTimeout(() => {
            this.showLoadingIndicator$.next(false);
        }, 1000)
    }
}
