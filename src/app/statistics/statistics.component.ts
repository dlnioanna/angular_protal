import {Component, OnInit} from '@angular/core';
import {MovieShowService} from '../services/movie-show.service';
import {MovieShow} from '../models/movieShow';
import {Movie} from '../models/movie';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  movieShows: MovieShow[];
  movies: Movie[];

  constructor(private movieShowService: MovieShowService) {
  }

  ngOnInit(): void {
    this.movieShowService.getMovieShows().subscribe(
      data => {
        this.movieShows = data;
      }
    );
  }
}
