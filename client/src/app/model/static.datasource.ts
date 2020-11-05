import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Observable, from } from "rxjs";

@Injectable()
export class StaticDataSource
{
    private movies: Movie[] = 
    [
        new Movie(1, 'Movie 1', 1.0, 'Year 1', '5'),
        new Movie(2, 'Movie 4', 2.0, 'Year 2', '50'),
        new Movie(3, 'Movie 8', 7.0, 'Year 3', '5'),
        new Movie(4, 'Movie 3', 8.0, 'Year 4', '5'),
        new Movie(5, 'Movie 12', 9.0, 'Year 5', '5'),
        new Movie(6, 'Movie 9', 6.0, 'Year 6', '5'),
        new Movie(7, 'Movie 11', 3.0, 'Year 7', '5'),
        new Movie(8, 'Movie 2', 4.0, 'Year 8', '5'),
        new Movie(9, 'Movie 6', 5.0, 'Year 9', '5'),
        new Movie(10, 'Movie 7', 4.0, 'Year 10', '5'),
        new Movie(11, 'Movie 10', 7.0, 'Year 11', '5'),
        new Movie(12, 'Movie 5', 2.0, 'Year 12', '5'),
        new Movie(13, 'Movie 13', 7.0, 'Year 11', '5'),
        new Movie(14, 'Movie 14', 2.0, 'Year 12', '5'),
        new Movie(15, 'Movie 15', 7.0, 'Year 11', '5'),
        new Movie(16, 'Movie 16', 2.0, 'Year 12', '5'),
    ];
    getMovies(): Observable<Movie[]>
    {
    return from([this.movies]);
    }
}

