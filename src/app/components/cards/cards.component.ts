import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  myMovieArr: any = []
  removedMovies: any[] = [];
  enableFilter:Object = false;
  enableFilterSad:Object = false;
  enableFilterMeh:Object = false;
  
  constructor(private movie: MovieService) {}

  ngOnInit(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
      for(let i =0; i<this.myMovieArr.length; i++){
        let a:any = localStorage.getItem(this.myMovieArr[i]["id"] + "toDelete")
        if(a !== null){
          console.log(a)
          this.myMovieArr = this.myMovieArr.filter((item: any) => item !==this.myMovieArr[i])
          this.removedMovies.push(this.myMovieArr[i])
          localStorage.setItem('removedMoviesList', JSON.stringify(this.removedMovies))
        }
      }
    })
  } 

  getSciMovies(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
    })
  }
}
