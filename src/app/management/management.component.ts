import {Component, OnInit} from '@angular/core';
import {MovieShowService} from '../services/movie-show.service';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  movies: Movie[];

  constructor(private movieShowService: MovieShowService) {
  }

  getMovies(): void {
    this.movieShowService.getMoviesOrderByMovieShowId().subscribe(
      movies => (this.movies = movies));
  }


  ngOnInit(): void {
    this.getMovies();
  }

}
