import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  finalize,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { FeedService } from '../../feed.service';
import { ResponseCombined } from '../../../interfaces/feed';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { constants } from '../../../../utils/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private feedService = inject(FeedService);
  private toast = inject(NgToastService);
  @ViewChild('drawer') public drawer!: MatDrawer;
  public searchResults$!: Observable<Partial<ResponseCombined[]>>;
  public searchControl = new FormControl('');
  public hasQuery = signal(false);
  public loading = signal(false);

  public ngOnInit(): void {
    this.setupSearchStream();
  }

  private setupSearchStream() {
    const searchInputChanges$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    this.searchResults$ = searchInputChanges$.pipe(
      tap((query) => {
        this.hasQuery.set(!!query?.trim());
      }),
      filter((query) => !!query?.trim()),
      switchMap((query) => this.performSearch(query as string)),
      catchError((error) => this.handleSearchError(error)),
      map((res) => res.data.items)
    );
  }
  private performSearch(query: string) {
    this.loading.set(true);

    const searchMethod = query.startsWith('#')
      ? this.feedService.searchHashTags(query.slice(1))
      : this.feedService.searchUser(query);

    return searchMethod.pipe(finalize(() => this.loading.set(false)));
  }

  private handleSearchError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.toast.danger('No result found', constants.TOAST_SUCCESS_TITLE);
    }
    console.log(error);
    return EMPTY;
  }
}
