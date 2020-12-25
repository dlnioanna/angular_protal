import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  getDate(dateObject): void {
    console.log(dateObject.value);
  }

  constructor(private dateService: DateService) {
  }
}
