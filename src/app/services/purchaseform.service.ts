import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {MovieShow} from '../models/movieShow';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket';
import {Guest} from '../models/guest';

const baseUrl = 'http://localhost:8080/api/v1/';

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

  // makePurchase(movieId: number, movieShowId: number, numberOfTickets: number, listOfGuests: Guest[]): void {
  //   this.http.post(baseUrl + 'purchase', movieId, movieShowId, numberOfTickets);
  // }
}
