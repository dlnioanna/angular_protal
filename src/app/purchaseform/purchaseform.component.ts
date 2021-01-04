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
  form: any = {};
  isSuccessful = false;
  isBuyingFailed = false;
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private purchaseformService: PurchaseformService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.movieId = params.movieId;
        this.movieShowId = params.movieShowId;
      });
    this.purchaseformService.getMovieById(this.movieId).subscribe(
      movie => this.movie = movie);
    this.purchaseformService.getMovieShowById(this.movieShowId).subscribe(
      movieShows => this.movieShow = movieShows);
  }

}

  // onSubmit(): void {
  // this.authService.register(this.form).subscribe(
  //   data => {
  //     console.log(data);
  //     this.isSuccessful = true;
  //     this.isSignUpFailed = false;
  //   },
  //   err => {
  //     this.errorMessage = err.errorMessage;
  //     this.isSignUpFailed = true;
  //   }
  // );
// }
