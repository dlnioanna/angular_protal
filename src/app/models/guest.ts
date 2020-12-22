import {Ticket} from './ticket';

export interface Guest{
  id: number;
  name: string;
  lastName: string;
  email: string;
  ticketOfGuest: Ticket;
}
