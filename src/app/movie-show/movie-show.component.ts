import {Component, OnInit} from '@angular/core';
import {MovieShowService} from '../services/movie-show.service';
import {MovieShow} from '../models/movieShow';
import {Movie} from '../models/movie';
import {Room} from '../models/room';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.css']
})
export class MovieShowComponent implements OnInit {
  movieShows: MovieShow[];
  movies: Movie[];
  room: Room;
  showDate: number;
  showDateForServer: number;
  message: string;

  getMovieShowsOnDate(showDateForServer): void {
    this.movieShowService.getMovieShowsOnDate(showDateForServer).subscribe(
      movies => (this.movies = movies));
    if (this.movies.length > 0) {
      this.message = 'Ταινίες που προβάλονται την ' + this.showDate + ' :';
    } else {
      this.message = 'Δεν προβάλονται ταινίες την ' + this.showDate + '.';
    }
  }

  receiveDate($event): void {
    this.showDate = $event.dateForHtml;
    this.showDateForServer = $event.dateForServer;
    this.getMovieShowsOnDate(this.showDateForServer);
  }

  constructor(private movieShowService: MovieShowService) {
  }

  ngOnInit(): void {
  }

}
