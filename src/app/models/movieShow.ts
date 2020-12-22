import {Ticket} from './ticket';

export interface MovieShow{
  id: number;
  startTime: number;
  endTime: number;
  date: number;
  movieId: number;
  showTickets: Ticket[];
}
