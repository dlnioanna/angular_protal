import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';


const baseUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  checkIn(ticketNumber: number): Observable<any> {
    return this.http.post<number>(baseUrl + 'ticketCheck/' + ticketNumber, {observe: 'response'});
  }
}
