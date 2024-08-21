import { Component, inject, ViewChild } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Store } from '@ngrx/store';
import { AUTH_ACTIONS } from '../../../auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @ViewChild('searchComponent') private searchComponent!: SearchComponent;
  private store = inject(Store);
  private router = inject(Router);
  public isDrawerOpen = false;

  public navItems = [
    { link: '/feed', icon: 'home', label: 'Home' },
    {
      icon: 'search',
      label: 'Search',
      action: (event: Event) => this.toggleDrawer(event),
    },
    { link: 'explore', icon: 'explore', label: 'Explore' },
    { icon: 'add_circle', label: 'Create' },
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

  // @HostListener('document:click', ['$event'])
  // public onDocumentClick() {
  //   this.isDrawerOpen = false;
  //   this.searchComponent.drawer.close();
  // }
}
