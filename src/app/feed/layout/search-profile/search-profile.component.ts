import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCombined, HashTags } from '../../../interfaces/feed';
import { FeedService } from '../../feed.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrl: './search-profile.component.scss',
})
export class SearchProfileComponent implements OnInit {
  private feedService = inject(FeedService);
  @Input() public user!: ResponseCombined | undefined;
  public profileImage$!: Observable<string>;
  public hash!: HashTags;

  public ngOnInit(): void {
    if (this.user?.profile_pic_url) {
      this.profileImage$ = this.feedService.getImage(this.user.profile_pic_url);
    }
  }
}
