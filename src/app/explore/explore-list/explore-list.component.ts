import { Component, inject, OnInit, signal } from '@angular/core';
import { ExploreService } from '../explore.service';
import { Observable, tap } from 'rxjs';
import { PostItem } from '../../interfaces/feed';

@Component({
  selector: 'app-explore',
  templateUrl: './explore-list.component.html',
  styleUrl: './explore-list.component.scss',
})
export class ExploreListComponent implements OnInit {
  private readonly exploreService = inject(ExploreService);
  public explore$!: Observable<PostItem[]>;
  public loading = signal(true);

  public ngOnInit(): void {
    this.explore$ = this.exploreService
      .loadExplorePosts()
      .pipe(tap(() => this.loading.set(false)));
  }
}
