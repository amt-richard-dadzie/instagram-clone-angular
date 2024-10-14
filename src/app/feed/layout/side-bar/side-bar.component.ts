import { Component, inject, ViewChild } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Store } from '@ngrx/store';
import { AUTH_ACTIONS } from '../../../auth/auth.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewPostComponent } from '../../create-new-post/create-new-post.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @ViewChild('searchComponent')
  private readonly searchComponent!: SearchComponent;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  public isDrawerOpen = false;

  public navItems = [
    { link: '/feed', icon: 'home', label: 'Home' },
    {
      icon: 'search',
      label: 'Search',
      action: (event: Event) => this.toggleDrawer(event),
    },
    { link: 'explore', icon: 'explore', label: 'Explore' },
    {
      icon: 'add_circle',
      label: 'Create',
      action: () =>
        this.dialog.open(CreateNewPostComponent, {
          maxWidth: '570px',
          maxHeight: '600px',
          height: '100%',
          width: '100%',
        }),
    },
    { link: 'profile/_cea_ella', label: 'Profile' },
    {
      icon: 'menu',
      label: 'More',
      action: () => {
        this.store.dispatch(AUTH_ACTIONS.logOut());
        this.router.navigateByUrl('/auth/login');
      },
    },
  ];

  public toggleDrawer(event: Event) {
    event.stopPropagation();
    this.searchComponent.drawer.toggle();
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public onclickOutside() {
    this.isDrawerOpen = false;
    this.searchComponent.drawer.close();
    this.searchComponent.searchControl.reset();
  }
}
