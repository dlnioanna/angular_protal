import {Component, OnInit} from '@angular/core';
import {TicketService} from '../services/ticket.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  form: any = {};
  successMessage: string;
  errorMessage: string;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
  }

  checkIn(): void {
    this.ticketService.checkIn(this.form.ticketNumber).subscribe(
      response => {
        this.successMessage = 'Το εισιτήριο σας είναι καταχωρίθηκε. Καλή διασκέδαση!';
        this.errorMessage = null;
      },
      err => {
        this.errorMessage = err.error;
        this.successMessage = null;
      }
    );
  }

  // checkTicket(): void {
  //   this.ticketService.checkTicket(this.form.ticketNumber).subscribe(
  //     data => {
  //       this.ticket = data;
  //     }
  //   );
  //   console.log('ticket is ' + this.ticket.id);
  // }
}
