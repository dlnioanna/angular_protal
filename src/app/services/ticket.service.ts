import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';



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

  checkIn(ticketNumber: number): Observable<any> {
    return this.http.post(baseUrl + 'ticketCheck/' + ticketNumber, httpOptions).pipe(
      map(
      (response: Response) => {
        console.log(response.json());
        return response.json();
      }));
  }

}
