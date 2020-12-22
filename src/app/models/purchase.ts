import {User} from './user';
import {Ticket} from './ticket';

export interface Purchase{
  id: number;
  user: User;
  ticketsPurchased: Ticket[];
}
