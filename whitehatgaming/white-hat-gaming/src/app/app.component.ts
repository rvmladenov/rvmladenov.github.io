import { Component } from '@angular/core';
import { LoadingIndicatorService } from './core/loading-indicator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showLoadingIndicator$: Observable<boolean>;

  constructor(private loadingIndicatorService: LoadingIndicatorService) {
    this.showLoadingIndicator$ = this.loadingIndicatorService.showLoadingIndicator$;
  }
}
