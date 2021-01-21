import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Movie} from '../models/movie';
import {MovieService} from '../services/movie.service';
import {MovieShow} from '../models/movieShow';
import {Room} from '../models/room';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[];
  movie: Movie;
  private id: number;
  room: Room;
  movieShow: MovieShow[];
  movieId: number;

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      movies => (this.movies = movies));
  }

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
