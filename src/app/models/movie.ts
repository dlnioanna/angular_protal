import {Room} from './room';

export interface Movie {
  id: number;
  title: string;
  movieYear: number;
  poster: string;
  rating: number;
  duration: number;
  description: string;
  roomList?: Room[];
}
