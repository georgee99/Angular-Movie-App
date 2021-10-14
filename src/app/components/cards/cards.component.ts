import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesInt } from 'src/app/MoviesInt';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  myArr: any = []
  myMovieArr: any = []
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
    })
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
}
