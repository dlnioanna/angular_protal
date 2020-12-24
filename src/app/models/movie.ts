import {Room} from './room';
import {MovieShow} from './movieShow';

export interface Movie {
  id: number;
  title: string;
  movieYear: number;
  poster: string;
  rating: number;
  description: string;
  movieShowsOfMovie: MovieShow[];
}
