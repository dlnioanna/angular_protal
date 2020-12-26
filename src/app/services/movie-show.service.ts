import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MovieShow} from '../models/movieShow';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieShowService {
  baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {
  }

  getMovieShowsOnDate(date: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'movieshowsOnDate/' + date);
  }

}
