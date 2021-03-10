import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {HttpClient} from '@angular/common/http';
import {Guest} from '../models/guest';

@Injectable({
  providedIn: 'root'
})

export class GuestService {
  baseUrl = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) { }

  getGuestsOfMovieShow(id: number): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.baseUrl + 'guests/' + id);
  }
}
