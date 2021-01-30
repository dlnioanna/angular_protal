import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Output, EventEmitter} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfMonth,
  startOfWeek, endOfWeek, format
} from 'date-fns';
import {MovieShow} from '../models/movieShow';
import {Movie} from '../models/movie';
import {Room} from '../models/room';
import {MovieShowService} from '../services/movie-show.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {validateEvents} from 'angular-calendar/modules/common/util';
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
const baseUrl = 'http://localhost:8080/api/v1/';

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  @Output() dateEvent = new EventEmitter<any>();
  formatedDate: any;
  formatedDateForServer: any;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  movieShows: MovieShow[];
  subject: Subject<MovieShow[]> = new Subject();
  movies: Movie[];
  room: Room;
  showDate: number;
  message: string;
  test: any[] = [];
  events: CalendarEvent[] = [];

  constructor(private movieShowService: MovieShowService, private router: Router, private http: HttpClient) {
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
    this.formatedDateForServer = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
  }

  getMovieShowsEvents(): Observable<CalendarEvent[]> {
    // this.movieShowService.getMovieShowsEvents().subscribe(
    //   data => (this.events = data));
    return this.movieShowService.getMovieShowsEvents().pipe(
      map(data => (data.map(value => this.convertEvent(value))))
    );
  }

  convertEvent(calEvent: CalendarEvent): CalendarEvent {
    let newEvent: CalendarEvent;
    newEvent = {
      start: new Date(calEvent.start),
      end: new Date(calEvent.end),
      title: calEvent.title,
      id: calEvent.id
    };
    return newEvent;
  }

  ngOnInit(): void {
    this.getMovieShowsEvents().subscribe(data => (this.events = data));
    this.formatDate(this.viewDate.toString());
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

  getMovieShowsOnDate(showDateForServer): void {
    this.movieShowService.getMovieShowsOnDate(showDateForServer).subscribe(
      movies => (this.movies = movies));
    if (this.movies.length > 0) {
      this.message = 'Ταινίες που προβάλονται την ' + this.showDate + ' :';
    } else {
      this.message = 'Δεν προβάλονται ταινίες την ' + this.showDate + '.';
    }
  }

}
