import {Movie} from './movie';

export interface Room {
  id: number;
  name: string;
  floor: number;
  capacity: number;
  movieList: Movie[];
}
