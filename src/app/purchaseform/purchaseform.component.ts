import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
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
  hidden = true;
  guests = [1];
  guestNameList: any[];
  guestEmailList: any[];
  counter = 1;

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


  enableEmailList(): any {
    this.hidden = !this.hidden;
    if (this.hidden) {
      while (this.guests.length > 0) {
        this.guests.pop();
      }
    }
    if (!this.hidden) {
      const array = [1];
      this.guests = array;
    }

    return;
  }

  addGuest(): void {
    this.guests.push(++this.counter);
  }

  removeGuest(index): void {
    console.log(index + ' to be removed');
    this.guests.splice(index, 1);
  }

  buyTickets(): void {
    while (this.counter > 0) {

    }
    this.purchaseformService.buyTickets();
  }
}
