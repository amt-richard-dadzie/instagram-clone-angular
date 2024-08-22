import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProfileService } from './profile.service';
import { ProfileData } from '../interfaces/profile-info';

export const profileResolver: ResolveFn<ProfileData> = (route) => {
  const username = route.paramMap.get('username');
  return inject(ProfileService).getUserProfileInfo(username as string);
};
