import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
    private readonly id = 'loading-indicator';
    public showLoadingIndicator$ = new BehaviorSubject(false);

    show() {
        this.showLoadingIndicator$.next(true);
    }
    
    hide() {
        this.showLoadingIndicator$.next(false);
    }
}
