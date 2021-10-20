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
  // @Output() myMovieArr: any = new EventEmitter<any[]>(); //Actual movies
  myMovieArr: any = []
  @Input() dell: any;
  removedMovies:any = [];
  @Input() checkOptionsOne:any = [
    { label: 'Happy', value: 'Happy', checked:false},
    { label: 'Sad', value: 'Sad' , checked:false},
    { label: 'Angry', value: 'Angry' , checked:false}
  ];

  
  // Dont forget to create function to tag the movies
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
    })
  }

  log(value: object[]): void {
    console.log(value[1]);
    
    this.myMovieArr = this.myMovieArr.filter((item: any) => item !== this.myMovieArr[this.checkOptionsOne[1]["value"]])

  }

  getMovieGenres(): void {
    this.movie.getMovieGenres().subscribe(movie => {
      this.myArr = movie;
    })
  }

  getSciMovies(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
    })
  }

  removeMovie(answer: any): void {
    answer = prompt("Which movie you wanna delete")
    let removedMovie = this.myMovieArr[answer]["title"]
    this.removedMovies.push(removedMovie)
    console.log(this.removedMovies)
    this.myMovieArr = this.myMovieArr.filter((item: any) => item!==this.myMovieArr[answer])
    console.log(answer)
    localStorage.setItem('removedmovie', JSON.stringify(this.removedMovies))
  }

}
