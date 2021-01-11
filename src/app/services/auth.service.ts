import {Injectable, Type} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/';
const httpOptions: { headers; observe; } = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: 'response'
};

const httpOptions2: { headers; observe; } = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data', boundary: '---boundary---'}), observe: 'response'
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  loginForm(email: string, password: string): Observable<any> {
    return this.http.post<User>(baseUrl + 'login', {email, password});
  }

  login(credentials): Observable<any> {
    return this.http.post(baseUrl + 'login', {
      username: credentials.username,
      password: credentials.password
    }, {observe: 'response'});
  }

  register(user): Observable<any> {
    return this.http.post<User>(baseUrl + 'register', {
      user
    }, {observe: 'response'});
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.clear();
  }


  authenticate(email): Observable<any> {
    return this.http.post(baseUrl + 'authenticate' + email, httpOptions);
    //   .pipe(
    //   map(
    //     userData => {
    //       sessionStorage.setItem('username', username);
    //       const tokenStr = 'Bearer ' + userData.token;
    //       sessionStorage.setItem('token', tokenStr);
    //       return userData;
    //     }
    //   )
    // );
  }


  // isUserLoggedIn(): any {
  //   const user = sessionStorage.getItem('username');
  //   return !(user === null);
  // }

  logOut(): void {
    sessionStorage.clear();
  }
}
