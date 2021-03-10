import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Guest} from '../models/guest';
import {User} from '../models/user';
import {GuestService} from '../services/guest.service';

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.css']
})
export class AttendantsComponent implements OnInit {
  movieShowId: any;
  guests: Guest[];
  buyers: User[];

  constructor(private activatedRoute: ActivatedRoute, private  guestService: GuestService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.movieShowId = params.movieShowId;
      });
    this.guestService.getGuestsOfMovieShow(this.movieShowId).subscribe(
      data => {
        this.guests = data;
      }
    );

  }

}
