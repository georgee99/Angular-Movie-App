import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MoviesInt } from 'src/app/MoviesInt';
import { MovieService } from 'src/app/services/movie.service';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from 'src/app/filter.pipe';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  myArr: any = [] //Genres
  myMovieArr: any = []
  @Input() dell: any;
  removedMovies: any[] = [];
  @Input() checkOptionsOne:any = [
    { label: 'Happy', value: 'Happy', checked:false},
    { label: 'Sad', value: 'Sad' , checked:false},
    { label: 'Meh', value: 'Meh' , checked:false}
  ];
  enableFilter = false;
  
  constructor(private movie: MovieService) {}

  ngOnInit(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
      for(let i =0; i<this.myMovieArr.length; i++){
        if(localStorage.getItem(this.myMovieArr[i]["id"] + 'toDelete') !== null){
          // this.myMovieArr = this.myMovieArr.filter((item: any) => item !==this.myMovieArr[i])
        }
      }
    })
  } // End of ngOnInit


  log(value:any) {
    console.log(value[1]["label"]);
    // let movieObj:any = localStorage.getItem('580489emotion')
    // movieObj = JSON.parse(movieObj)
    // if(movieObj.emotion ==='happy'){
    //   console.log("happy")
    // }
    for(let i =0; i<this.myMovieArr.length; i++){
      if(localStorage.getItem(this.myMovieArr[i]["id"] + 'emotion') !== null){
        console.log(this.myMovieArr[i]["title"] + " has local storage in it")
      }
    }
    for(let i =0; i<3; i++){
      if(value[i]["label"] === "Sad"){
        console.log('works')
      }
    }
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

  // Dont need removeMovie method anymore

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
