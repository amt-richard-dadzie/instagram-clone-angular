import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthState } from './auth/auth.selectors';
import { AUTH_ACTIONS } from './auth/auth.actions';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'instagram-clone-angular';

  private store = inject(Store);
  private authState = this.store.selectSignal(selectAuthState);
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
    localStorage.setItem('auth', JSON.stringify(this.authState()));
  }

  public ngOnInit(): void {
    const retrievedAuthSate = localStorage.getItem('auth');
    if (retrievedAuthSate) {
      this.store.dispatch(
        AUTH_ACTIONS.getAuthState(JSON.parse(retrievedAuthSate))
      );
    }

    localStorage.removeItem('auth');
  }
}
