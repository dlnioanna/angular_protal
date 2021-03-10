import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {MovieShow} from '../models/movieShow';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ticket} from '../models/ticket';
import {Guest} from '../models/guest';

const baseUrl = 'http://localhost:8080/api/v1/';
const httpOptions: { headers; observe; } = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseformService {

  constructor(private http: HttpClient) {
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(baseUrl + 'movies/' + id);
  }

  getMovieShowById(movieShowId: number): Observable<MovieShow> {
    return this.http.get<MovieShow>(baseUrl + 'movieshows/' + movieShowId);
  }

  buyTickets(ticketsData): Observable<any> {
    return this.http.post(baseUrl + 'purchase_tickets', ticketsData, httpOptions);
  }
}
