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
    //   .pipe(
    //   map((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       console.log('this is where to store new token');
    //       const headerToken = event.headers.get('Authorization').replace('Bearer', '');
    //       event.headers.get('Authorization').replace('Bearer', '');
    //       const decodedToken = atob(headerToken.split('.')[1]);
    //       const tokenJson = JSON.parse(decodedToken);
    //       const username = tokenJson.sub;
    //       const role = tokenJson.authorities[0].authority;
    //       this.tokenStorage.saveToken(headerToken);
    //       this.tokenStorage.saveUser(username);
    //       this.tokenStorage.saveUserRole(role);
    //     }
    //     return event;
    //   })
    // );
  }
}
