import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState, selectAppState, APP_ACTIONS } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'instagram-clone-angular';

  private store = inject(Store);
  private readonly appState = this.store.selectSignal(selectAppState);
  public loading = signal(false);

  public constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading.set(true);
        spinner.show();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading.set(false);
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnload() {
    localStorage.setItem('appState', JSON.stringify(this.appState()));
  }

  public ngOnInit(): void {
    const retrievedAppState = localStorage.getItem('appState');

    if (retrievedAppState) {
      const appState: AppState = JSON.parse(retrievedAppState);
      this.store.dispatch(APP_ACTIONS.restoreAppState(appState));
    }

    localStorage.removeItem('appState');
  }
}
