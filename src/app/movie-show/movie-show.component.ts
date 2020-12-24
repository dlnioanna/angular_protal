import {Component, OnInit} from '@angular/core';
import {MovieShowService} from '../services/movie-show.service';
import {MovieShow} from '../models/movieShow';
import {Movie} from '../models/movie';
import {Room} from '../models/room';

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.css']
})
export class MovieShowComponent implements OnInit {
  movieShows: MovieShow[];
  movie: Movie;
  room: Room;

  getMovieShow(): void {
    this.movieShowService.getMovieShows().subscribe(
      movieShows => (this.movieShows = movieShows));
  }

  constructor(private movieShowService: MovieShowService) {
  }

  ngOnInit(): void {
  }

}
