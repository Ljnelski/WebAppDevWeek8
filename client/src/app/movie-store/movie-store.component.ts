import { Component } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieRepository } from './../model/movie.repository';

@Component({
  selector: 'app-movie-store',
  templateUrl: './movie-store.component.html',
  styleUrls: ['./movie-store.component.css']
})
export class MovieStoreComponent 
{
    public selectedRating = null;
    public moviesPerPage = 4;
    public selectedPage = 1;
  
    constructor(private repository: MovieRepository) { } 

    get movies(): Movie[]
    {
        const pageIndex = (this.selectedPage - 1) * this.moviesPerPage;
        return this.repository.getMovies(this.selectedRating)
        .slice(pageIndex, pageIndex + this.moviesPerPage);
    }

    get ratings(): number[]
    {
        return this.repository.getRatings();
    }

    changeRating(newRating?: number) : void
    {
        this.selectedRating = newRating;
    }

    changePage(newPage: number) : void
    {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number): void
    {
        this.moviesPerPage = Number(newSize);
        this.changePage(1);
    }
    get pageCount(): number
    {
        return Math.ceil(this.repository
        .getMovies(this.selectedRating).length / this.moviesPerPage);
    }

    /* 
    get pageNumbers(): Number[]
    {
        return Array(Math.ceil(this.repository
            .getMovies(this.selectedRating).length/ this.moviesPerPage))
            .fill(0).map((x, i) => i + 1);
    }
    */
}
