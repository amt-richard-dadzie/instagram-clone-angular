import { authHeadersInterceptor } from './auth/interceptors/auth-headers.interceptor';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { rapidApiInterceptor } from './rapid-api.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgToastModule } from 'ng-angular-popup';
import { AuthModule } from './auth/auth.module';
import { tokenInterceptor } from './auth/interceptors/token.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { feedReducer } from './feed/feed.reducer';
import { FeedModule } from './feed/feed.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgToastModule,
    AppRoutingModule,
    AuthModule,
    FeedModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise-fade-rotating' }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        authHeadersInterceptor,
        tokenInterceptor,
        rapidApiInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
