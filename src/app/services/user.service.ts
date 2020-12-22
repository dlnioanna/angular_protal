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

}