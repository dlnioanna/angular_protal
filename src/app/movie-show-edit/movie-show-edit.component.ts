import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {MovieShowService} from '../services/movie-show.service';
import {Movie} from '../models/movie';
import {MovieShow} from '../models/movieShow';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-movie-show-edit',
  templateUrl: './movie-show-edit.component.html',
  styleUrls: ['./movie-show-edit.component.css']
})
export class MovieShowEditComponent implements OnInit {
  movieShowId: any;
  movieId: any;
  movie: Movie;
  movieShow: MovieShow;
  uploadNewPoster = false;
  form: any = {};
  selectedFile: File;
  isSuccessful = false;
  updateFailed = false;
  errorMessage = '';
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService,
              private movieShowService: MovieShowService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.movieId = params.movieId;
        this.movieShowId = params.movieShowId;
      });
    this.movieService.getMovie(this.movieId).subscribe(
      movie => this.movie = movie);
    this.movieShowService.getMovieShowById(this.movieShowId).subscribe(
      movieShows => this.movieShow = movieShows);
  }

  onEdit(): void {
    const uploadMovieData = new FormData();
    uploadMovieData.append('poster', this.selectedFile, this.selectedFile.name);
    uploadMovieData.append('title', this.movie.title);
    uploadMovieData.append('movie_year', this.movie.movieYear.toString());
    uploadMovieData.append('rating', this.movie.rating.toString());
    uploadMovieData.append('description', this.movie.description);
    uploadMovieData.append('movieShowId', this.movie.movieShowsOfMovie[0].id.toString());
    this.httpClient.post('http://localhost:8080/api/v1/movies/save', uploadMovieData, {observe: 'response'})
      .subscribe(
        response => {
          this.isSuccessful = true;
          this.updateFailed = false;
        },
        err => {
          this.errorMessage = err.errorMessage;
          this.updateFailed = true;
        }
      );
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }
}
