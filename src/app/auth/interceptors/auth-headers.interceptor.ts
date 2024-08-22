import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.AUTH_API_BASEURL)) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-APN': environment.APN,
      },
    });
    return next(modifiedReq);
  }
  return next(req);
};
