import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {shareReplay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Token} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/login', {email, password});
  }

//   sendToRestApiMethod(googleToken:String){
//     this.http.post("url to google login in your rest api"),
//       {googleToken : Token}}).subscribe(
//         onSucces=>{
//           //login succesful save the token i got from my rest api in a cookie or localstorage
//            }, onFail=>{
//           //login was unsuccessful show an error message
// }
//   )


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
