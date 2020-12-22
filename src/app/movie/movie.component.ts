import { Component, OnInit } from '@angular/core';
import {Movie} from '../models/movie';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
movies: Movie[];

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => (this.movies = movies));
  }
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

}
