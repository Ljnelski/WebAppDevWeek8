import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Movie} from './movie.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class MovieRepository
{
    private movies: Movie[]= [];
    private ratings: number[] = [];

    constructor(private datasource: StaticDataSource)
    {
        datasource.getMovies().subscribe(data => {
            this.movies = data;
            this.ratings = data.map(m => m.Rating_IMDB).filter((a, index, array) => array.indexOf(a) == index).sort();
        });        
    }
    getMovies(rating: number = null): Movie[]
    {
        return this.movies
            .filter(m => rating == null || rating == m.Rating_IMDB);
    }
    getMovie(id: number): Movie
    {
        return this.movies.find(m => m._id === id) ;
    }
    getRatings(): number[]
    {
        return this.ratings
    }

}