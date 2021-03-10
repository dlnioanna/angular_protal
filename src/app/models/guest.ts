import {Ticket} from './ticket';

export interface Guest{
  id: number;
  name: string;
  email: string;
  ticketId: number;
}
