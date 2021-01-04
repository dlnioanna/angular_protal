import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {log} from 'util';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('auth-token')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer' + sessionStorage.getItem('auth-token')
        }
      });
    }

    return next.handle(req);
  }
}
