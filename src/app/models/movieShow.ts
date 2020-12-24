import {Ticket} from './ticket';
import {Room} from './room';

export interface MovieShow {
  id: number;
  startTime: number;
  endTime: number;
  showDate: number;
  movieOfMovieShow: number;
  showTickets: Ticket;
  roomOfMovieShow: Room;
}


