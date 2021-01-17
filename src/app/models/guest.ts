import {Ticket} from './ticket';

export interface Guest{
  id: number;
  name: string;
  email: string;
  ticketOfGuest: Ticket;
}
