import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  getUser(): Observable<User[]> {
    return this.http.get<User[]>('/user');
  }

  constructor(private http: HttpClient) {
  }

}
