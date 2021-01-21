import {Ticket} from './ticket';
import {Room} from './room';
import {Movie} from './movie';

export interface MovieShow {
  id: number;
  startTime: number;
  endTime: number;
  showDate: number;
  movieOfMovieShow: Movie;
  showTickets: Ticket[];
  roomOfMovieShow: Room;
}


