import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MovieShow} from '../models/movieShow';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/movie';
import {CalendarEvent} from 'angular-calendar';


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

  getMovieShows(): Observable<MovieShow[]> {
    return this.http.get<MovieShow[]>(this.baseUrl + 'movieshows');
  }

  getMovieShowsEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.baseUrl + 'movieshows/calendarEvents');
  }

  getMovieShowById(id: number): Observable<MovieShow> {
    return this.http.get<MovieShow>(this.baseUrl + 'movieshows/' + id);
  }

  moviesByMovieShowId(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.baseUrl + 'movies/movieshows/' + id);
  }

  getMoviesOrderByMovieShowId(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'moviesByMovieShowId');
  }
}
