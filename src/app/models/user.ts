import {Purchase} from './purchase';
import {Ticket} from './ticket';

export interface User {
  id: number;
  name: string;
  lastName: string;
  telephone: bigint;
  email: string;
  image: string;
  username: string;
  password: string;
  role: string;
  userPurchases: Purchase[];
  ticketsBought: Ticket[];
}

export class User {
  constructor() {
  }
}
