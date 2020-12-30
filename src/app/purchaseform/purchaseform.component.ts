import {Component, OnInit} from '@angular/core';
import {MovieShow} from '../models/movieShow';
import {ActivatedRoute, Router, UrlSerializer} from '@angular/router';
import {PurchaseService} from '../services/purchase.service';
import {PurchaseformService} from '../services/purchaseform.service';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-purchaseform',
  templateUrl: './purchaseform.component.html',
  styleUrls: ['./purchaseform.component.css']
})
export class PurchaseformComponent implements OnInit {
  movieShowId: any;
  movieId: any;
  movie: Movie;
  movieShow: MovieShow;
  queryObject: any;

  constructor(private activatedRoute: ActivatedRoute, private purchaseformService: PurchaseformService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.movieId = params.movieId;
        this.movieShowId = params.movieShowId;
      });
    console.log('movie id is  ' + this.movieId + ' and movieshow id is ' + this.movieShowId);
    this.purchaseformService.getMovieById(this.movieId).subscribe(
      movie => this.movie = movie);
    this.purchaseformService.getMovieShowById(this.movieShowId).subscribe(
      movieShows => this.movieShow = movieShows);
  }

}
