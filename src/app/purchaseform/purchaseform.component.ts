import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import {MovieShow} from '../models/movieShow';
import {ActivatedRoute, Router, UrlSerializer} from '@angular/router';
import {PurchaseService} from '../services/purchase.service';
import {PurchaseformService} from '../services/purchaseform.service';
import {Movie} from '../models/movie';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../services/token-storage.service';
import {HttpClient} from '@angular/common/http';

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
  showTicketsError = false;
  errorMessage = '';
  ticketsErrorMessage = 'Η κράτησή σας δεν ολοκληρώθηκε. Ελέγξτε τα στοιχεία κράτησης.';
  ticketsPurchaseMessage = 'Η κράτησή σας ολοκληρώθηκε. Ελέγξτε το email σας για την επιβεβαίωση κράτησης.';
  hidden = true;
  counter = 1;
  formGroup: FormGroup;
  guests: any[];

  constructor(private activatedRoute: ActivatedRoute, private purchaseformService: PurchaseformService,
              private formBuilder: FormBuilder, private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient) {
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
      guests: this.formBuilder.array([this.addGuestFormGroup()])
    });
  }

  addGuestFormGroup(): FormGroup {
    return this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', Validators.required],
    });
  }

  addGuestButtonClick(): void {
    (this.formGroup.get('guests') as FormArray).push(
      this.addGuestFormGroup()
    );
  }

  removeGuestButtonClick(i): void {
    (this.formGroup.get('guests') as FormArray).removeAt(i);
  }

  onSubmit(): void {
    const guestsArray = this.formGroup.get('guests').value;
    if ((this.form.numberOfTickets - 1) < guestsArray.length) {
      this.showTicketsError = true;
      this.isSuccessful = false;
      this.ticketsErrorMessage = 'Ο αριθμός των καλεσμένων σας υπερβαίνει τον αριθμό εισιτηρίων.';
      if (this.form.numberOfTickets === guestsArray.length) {
        this.ticketsErrorMessage = 'Ο αριθμός των καλεσμένων σας υπερβαίνει τον αριθμό εισιτηρίων' +
          ' (συμπεριλαμβανομένου του δικού σας εισιτηρίου). ';
      }
    } else {
      const uploadData = new FormData();
      this.showTicketsError = false;
      this.ticketsErrorMessage = '';
      uploadData.append('userName', this.tokenStorageService.getUser());
      uploadData.append('numberOfTickets', this.form.numberOfTickets);
      uploadData.append('guestList', JSON.stringify(this.formGroup.value));
      uploadData.append('movieShowId', this.movieShowId);
      if (this.tokenStorageService.getSocialUser()) {
        uploadData.append('socialUserEmail', this.tokenStorageService.getSocialUserEmail());
        uploadData.append('socialUser', this.tokenStorageService.getSocialUser());
        uploadData.append('isSocialUser', '1');
      } else {
        uploadData.append('isSocialUser', '0');
      }
      // uploadData.append('guestList', this.formGroup.value);
      this.httpClient.post('http://localhost:8080/api/v1/purchase_tickets', uploadData, {observe: 'response'})
        .subscribe(response => {
            this.isSuccessful = true;
            this.showTicketsError = false;
          },
          err => {
            this.showTicketsError = true;
            this.isSuccessful = false;
            this.errorMessage = err.errorMessage;
            this.ticketsErrorMessage = 'Η κράτησή σας δεν ολοκληρώθηκε. Ελέγξτε τα στοιχεία κράτησης.';
          });
    }
  }

  enableEmailList(): any {
    this.hidden = !this.hidden;
    return;
  }


  buyTickets(): void {
    const uploadData = new FormData();
    this.showTicketsError = false;
    this.ticketsErrorMessage = '';
    uploadData.append('userName', this.tokenStorageService.getUser());
    uploadData.append('numberOfTickets', this.form.numberOfTickets);
    uploadData.append('movieId', this.movieId);
    uploadData.append('movieShowId', this.movieShowId);
    if (this.tokenStorageService.getSocialUser()) {
      uploadData.append('socialUserEmail', this.tokenStorageService.getSocialUserEmail());
      uploadData.append('isSocialUser', '1');
    } else {
      uploadData.append('isSocialUser', '0');
    }
    // uploadData.append('guestList', this.formGroup.value);
    this.httpClient.post('http://localhost:8080/api/v1/purchase_tickets', uploadData, {observe: 'response'})
      .subscribe(response => {
          this.isSuccessful = true;
          this.showTicketsError = false;
        },
        err => {
          this.showTicketsError = false;
          this.isSuccessful = false;
          this.errorMessage = err.errorMessage;
          this.ticketsErrorMessage = 'Η κράτησή σας δεν ολοκληρώθηκε. Ελέγξτε τα στοιχεία κράτησης.';
        });

  }
}
