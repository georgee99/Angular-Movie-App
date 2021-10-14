import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MoviesInt } from 'src/app/MoviesInt';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  myArr: any = [] //Genres
  @Output() myMovieArr: any = new EventEmitter<any[]>(); //Actual movies
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
    })

    console.log(this.myMovieArr)
  }


  getMovieGenres(): void {
    this.movie.getMovieGenres().subscribe(movie => {
      console.warn(movie)
      this.myArr = movie;
    })
  }

  getSciMovies(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
    })
  }

  getMovieId(movies: MoviesInt){
    console.log(movies)
    // Uses this as the button for router
  }

  emitMovies(): void{
    
  }
}
