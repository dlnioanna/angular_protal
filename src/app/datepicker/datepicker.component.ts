import {Component, EventEmitter, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

export class DatepickerComponent {
  eventDateInput: string;
  formatedDate: any;
  formatedDateForServer: any;

  @Output() dateEvent = new EventEmitter<any>();

  getDate(event: MatDatepickerInputEvent<unknown>): void {
    this.eventDateInput = `${event.value}`;
    this.formatDate(this.eventDateInput);
  }

  sendDate(): void {
    this.dateEvent.emit({dateForHtml: this.formatedDate, dateForServer: this.formatedDateForServer});
  }

  formatDate(inputString: string): void {
    const inputDate = new Date(inputString);
    this.formatedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear()}`;
    this.formatedDateForServer = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
  }

}

