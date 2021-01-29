import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import {MovieShow} from '../models/movieShow';
import {ActivatedRoute, Router, UrlSerializer} from '@angular/router';
import {PurchaseService} from '../services/purchase.service';
import {PurchaseformService} from '../services/purchaseform.service';
import {Movie} from '../models/movie';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  counter = 1;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private purchaseformService: PurchaseformService,
              private formBuilder: FormBuilder) {
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

    this.formGroup = this.formBuilder.group({
      products: this.formBuilder.array([this.addGuestFormGroup()])
    });
  }

  addGuestFormGroup(): FormGroup {
    return this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', Validators.required],
    });
  }

  addGuestButtonClick(): void {
    (this.formGroup.get('products') as FormArray).push(
      this.addGuestFormGroup()
    );
  }
  removeGuestButtonClick(i): void {
    (this.formGroup.get('products') as FormArray).removeAt(i);
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
    console.log(this.form.numberOfTickets);
  }

  enableEmailList(): any {
    this.hidden = !this.hidden;
    return;
  }


  buyTickets(): void {
    console.log('button clicked');
  }
}
