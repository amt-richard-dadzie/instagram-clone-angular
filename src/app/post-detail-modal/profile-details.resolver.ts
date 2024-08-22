import { ResolveFn } from '@angular/router';
import { PostDetailsService } from './post-details.service';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { PostDetailsResponse } from './post-details';

export const postDetailsResolver: ResolveFn<PostDetailsResponse> = (route) => {
  const postCode = route.paramMap.get('id');
  const postDetailsService = inject(PostDetailsService);

  return postDetailsService.fetchPostDetails(postCode as string).pipe(
    catchError((error) => {
      console.error('Error fetching post details:', error);
      return EMPTY;
    })
  );
};
