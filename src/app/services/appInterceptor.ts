import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {log} from 'util';
import {map} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(public tokenStorage: TokenStorageService) {
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
