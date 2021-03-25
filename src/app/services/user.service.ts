import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {Movie} from '../models/movie';

const baseUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(baseUrl + 'all', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(baseUrl + 'user', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(baseUrl + 'admin', {responseType: 'text'});
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(baseUrl + 'user/' + id);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(baseUrl + 'username/' + username);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(baseUrl + 'email/' + email);
  }

  getUserByUsernameOrEmail(user): Observable<any[]> {
    return this.http.get<User[]>(baseUrl + 'getUser/' + user.username + '/' + user.email);
  }

}
