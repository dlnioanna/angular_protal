import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('auth-token')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer' + sessionStorage.getItem('auth-token')
        }
      });
    }
    // const xhr = req.clone({
    //   headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    // });
    return next.handle(req);

  }
}
