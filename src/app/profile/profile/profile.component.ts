import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileData } from '../../interfaces/profile-info';
import { FeedService } from '../../feed/feed.service';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private feedService = inject(FeedService);
  private router = inject(Router);
  public thumbnailImage!: string;
  public profile$!: Observable<ProfileData>;
  public profileImage$!: Observable<string>;

  public ngOnInit(): void {
    this.profile$ = this.route.data.pipe(map((data) => data['profile']));

    this.profileImage$ = this.profile$.pipe(
      switchMap((profile) =>
        this.feedService.getImage(profile.data.profile_pic_url_hd)
      )
    );
  }
}
