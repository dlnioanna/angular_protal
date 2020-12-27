import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = 'http://localhost:8080/api/v1/';

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(this.baseUrl + 'all', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.baseUrl + 'user', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin', {responseType: 'text'});
  }

}
