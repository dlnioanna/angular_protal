import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {MovieShowService} from '../services/movie-show.service';
import {Movie} from '../models/movie';
import {MovieShow} from '../models/movieShow';
import {HttpClient} from '@angular/common/http';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';

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
  showRoom: Room[];
  uploadNewPoster = false;
  form: any = {};
  selectedFile: File;
  isSuccessful = false;
  updateFailed = false;
  errorMessage = '';
  dt: any;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService,
              private movieShowService: MovieShowService, private httpClient: HttpClient,
              private roomService: RoomService) {
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
    this.roomService.getRooms().subscribe(
      rooms => this.showRoom = rooms);
  }

  onEdit(): void {
    const uploadMovieData = new FormData();
    if (this.uploadNewPoster) {
      uploadMovieData.append('imageFile', this.selectedFile, this.selectedFile.name);
    } else {
      uploadMovieData.append('imageFile', this.movie.poster);
    }
    uploadMovieData.append('title', this.movie.title);
    uploadMovieData.append('movie_year', this.movie.movieYear.toString());
    uploadMovieData.append('rating', this.movie.rating.toString());
    uploadMovieData.append('description', this.movie.description);
    uploadMovieData.append('movieShowId', this.movie.movieShowsOfMovie[0].id.toString());
    uploadMovieData.append('editedMovieId', this.movieId.toString());
    uploadMovieData.append('capacity', this.movieShow.roomOfMovieShow.capacity.toString());
    uploadMovieData.append('date', this.movieShow.showDate.toString());
    uploadMovieData.append('time', this.movieShow.startTime.toString());
    console.log(uploadMovieData);
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
    this.uploadNewPoster = true;

  }
}
