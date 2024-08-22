import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const rapidApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiUrl)) {
    const modifiedReq = req.clone({
      setHeaders: {
        'x-rapidapi-key': environment.rapidApiKey,
        'x-rapidapi-host': environment.rapidApiHostName,
      },
    });

    return next(modifiedReq);
  }
  return next(req);
};
