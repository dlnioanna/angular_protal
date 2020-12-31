import {Purchase} from './purchase';
import {MovieShow} from './movieShow';
import {User} from './user';
import {Guest} from './guest';

export interface Ticket {
  id: number;
  price: number;
  timeEdited: Date;
  used: boolean;
  ticketPurchase: Purchase;
  movieShow: MovieShow;
  buyer: User;
  guestOfTicket: Guest;
}
