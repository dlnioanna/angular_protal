import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MovieShow} from '../models/movieShow';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl + 'rooms');
  }

}
