import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {MovieShow} from '../models/movieShow';

const baseUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  constructor(private http: HttpClient) {
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(baseUrl + 'movies/' + id);
  }

  getMovieShowsOfMovie(movieId: number): Observable<MovieShow[]> {
    return this.http.get<MovieShow[]>(baseUrl + 'movieshows/movie/' + movieId);
  }

}
