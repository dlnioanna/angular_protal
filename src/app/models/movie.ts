import {Room} from './room';

export interface Movie {
  id: number;
  title: string;
  movieYear: number;
  url: string;
  rating: number;
  duration: number;
  roomList?: Room[];
}
