import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';


const baseUrl = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  loginForm(email: string, password: string): any {
    return this.http.post<User>(baseUrl + '/login', {email, password});
  }

  login(credentials): Observable<any> {
    return this.http.post(baseUrl + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(baseUrl + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.clear();
  }

//
//   https://dev.to/nileshsanyal/implementing-oauth2-social-login-with-facebook-part-2-2pee
//   fbLogin() {
//     return new Promise((resolve, reject) => {
//
//       FB.login(result => {
//         if (result.authResponse) {
//           return this.http
//             .post(`http://localhost:8000/users/auth/facebook`, {access_token: result.authResponse.accessToken})
//             .toPromise()
//             .then(response => {
//               const token = response;
//               if (token) {
//                 localStorage.setItem('id_token', JSON.stringify(token));
//               }
//               resolve(response);
//             })
//             .catch(() => reject());
//         } else {
//           reject();
//         }
//       }, { scope: 'public_profile,email' });
//     });
//   }
//
//   isLoggedIn() {
//     return new Promise((resolve, reject) => {
//       this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
//     });
//   }
//
//   getCurrentUser() {
//     return new Promise((resolve, reject) => {
//       return this.http.get(`http://localhost:8000/api/auth/me`).toPromise().then(response => {
//         resolve(response);
//       }).catch(() => reject());
//     });
//   }
//
//   logout() {
//     localStorage.removeItem('id_token');
//     localStorage.clear();
//   }
//
// }

}
