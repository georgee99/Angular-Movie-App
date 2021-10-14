import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesInt } from './MoviesInt'
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'test-angular-app';
  myArr: any = []
  myMovieArr: any = []

  constructor(private movie: MovieService){
  }

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
