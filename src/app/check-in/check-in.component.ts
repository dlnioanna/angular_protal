import {Component, OnInit} from '@angular/core';
import {TicketService} from '../services/ticket.service';
import {Ticket} from '../models/ticket';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  form: any = {};
  successMessage: any;
  errorMessage: any;

  ticket: Ticket;

  constructor(private ticketService: TicketService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  checkIn(): void {
    this.ticketService.checkIn(this.form.ticketNumber).subscribe(
      data => {
        this.errorMessage = null;
        this.successMessage = data;
      },
      err => {
        this.successMessage = null;
        this.errorMessage = err.error;
      });
  }

}
