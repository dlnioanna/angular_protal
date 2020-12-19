import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {shareReplay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/login', {email, password});
  }
}
