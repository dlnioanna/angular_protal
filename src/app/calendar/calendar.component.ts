import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Output, EventEmitter} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {isSameDay, isSameMonth} from 'date-fns';
import {MovieShow} from '../models/movieShow';
import {Movie} from '../models/movie';
import {MovieShowService} from '../services/movie-show.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1eff22',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  formatedDate: any;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  movieShows: MovieShow[];
  subject: Subject<MovieShow[]> = new Subject();
  movies: Movie[];
  showDate: number;
  message: string;
  test: any[] = [];
  events: CalendarEvent[] = [];

  constructor(private movieShowService: MovieShowService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMovieShowsEvents().subscribe(data => (this.events = data));
    this.formatDate(this.viewDate.toString());
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.formatDate(this.viewDate.toString());
    }
  }

  formatDate(inputString: string): void {
    const inputDate = new Date(inputString);
    this.formatedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear()}`;
  }

  getMovieShowsEvents(): Observable<CalendarEvent[]> {
    return this.movieShowService.getMovieShowsEvents().pipe(
      map(data => (data.map(value => this.convertEvent(value))))
    );
  }

  convertEvent(calEvent: CalendarEvent): CalendarEvent {
    let newEvent: CalendarEvent;
    console.log('title is ' + calEvent.title + 'color is ' + calEvent.color);
    newEvent = {
      start: new Date(calEvent.start),
      end: new Date(calEvent.end),
      title: calEvent.title,
      id: calEvent.id,
      color: calEvent.color
  }
    ;
    return newEvent;
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  handleEvent(event: CalendarEvent): void {
    this.router.navigate(['/purchase'], {queryParams: {movieId: event.id}});
  }

  setActiveDay(): void {
    this.activeDayIsOpen = true;
  }

}
