import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Ticket} from '../models/ticket';


const baseUrl = 'http://localhost:8080/api/v1/';
const httpOptions: { headers; observe; } = {
  headers: new HttpHeaders({'Content-Type': 'application/json', responseType: 'text'}), observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  checkIn(ticketNumber: number): any {
    return this.http.put(baseUrl + 'ticketCheck/' + ticketNumber, {observe: 'response'});
  }

  checkTicket(ticketNumber: number): Observable<any> {
    return this.http.get(baseUrl + 'checkTicket/' + ticketNumber);
  }
}
