import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PurchaseService} from '../services/purchase.service';
import {MovieShow} from '../models/movieShow';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  movie: Movie;
  movieShows: MovieShow[];
  movieShowId: number;
  movieId: number;

  constructor(private activatedRoute: ActivatedRoute, private purchaseService: PurchaseService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => this.movieId = params.movieId);
    this.purchaseService.getMovie(this.movieId).subscribe(
      movie => this.movie = movie);
    this.purchaseService.getMovieShowsOfMovie(this.movieId).subscribe(
      movieShows => this.movieShows = movieShows);
  }

}
