import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  myMovieArr: IMovie[] = []; // TODO: Sort this shit out dude... this is the LAST time you EVER use 'any'
  // removedMovies: IMovie[] = [];
  myMovieArrFiltered: IMovie[] = [];
  isCheckedHap: boolean = false;
  isCheckedSad: boolean = false;
  isCheckedMeh: boolean = false;
  searchText: any;
  p: number = 1;
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.movie.getMovies().subscribe(movie => {
      console.warn(movie)
      this.myMovieArr = movie;
      for (let i = 0; i < this.myMovieArr.length; i++) {
        let deleted: any = localStorage.getItem(this.myMovieArr[i]["id"] + "toDelete")
        if (deleted !== null) {
          this.myMovieArr = this.myMovieArr.filter((item: any) => item.id !== this.myMovieArr[i]["id"])
          i--;
          // this.removedMovies.push(this.myMovieArr[i])
          // localStorage.setItem('removedMoviesList', JSON.stringify(this.removedMovies))
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

  happyMovieFilter(): IMovie[] {
    if(this.isCheckedHap){
      for(let i =0; i<this.myMovieArr.length; i++){
        let m:any = localStorage.getItem(this.myMovieArr[i]["id"] + "emotion")
        m = JSON.parse(m)
        if(m !== null && m["emotion"] == "happy"){
          this.myMovieArrFiltered.push(this.myMovieArr[i])  
        }
      }
    } else {
      for(let i =0; i<this.myMovieArrFiltered.length;i++){
        let m:any = localStorage.getItem(this.myMovieArrFiltered[i]["id"] + "emotion")
        m = JSON.parse(m)
        console.log(m)
        if(m !== null && m["emotion"] == "happy"){
          this.myMovieArrFiltered.splice(i,1)
          i--;
        } 
      }
    }
    return this.myMovieArrFiltered;
  }

  sadMovieFilter(): IMovie[] {
    if(this.isCheckedSad){
      for(let i =0; i<this.myMovieArr.length; i++){
        let m:any = localStorage.getItem(this.myMovieArr[i]["id"] + "emotion")
        m = JSON.parse(m)
        if(m !== null && m["emotion"] == "sad"){
          this.myMovieArrFiltered.push(this.myMovieArr[i])
        } 
      }    
    } else {
      for(let i =0; i<this.myMovieArrFiltered.length;i++){
        let m:any = localStorage.getItem(this.myMovieArrFiltered[i]["id"] + "emotion")
        m = JSON.parse(m)
        if(m !== null && m["emotion"] == "sad"){
          this.myMovieArrFiltered.splice(i,1)
          i--;
        } 
      }
    }
    return this.myMovieArrFiltered;
  }

  mehMovieFilter(): IMovie[] {
    if(this.isCheckedMeh){
      for(let i =0; i<this.myMovieArr.length; i++){
        let m:any = localStorage.getItem(this.myMovieArr[i]["id"] + "emotion")
        m = JSON.parse(m)
        if(m !== null && m["emotion"] == "meh"){
          this.myMovieArrFiltered.push(this.myMovieArr[i])
        } 
      }    
    } else {
        for(let i =0; i<this.myMovieArrFiltered.length;i++){
          let m:any = localStorage.getItem(this.myMovieArrFiltered[i]["id"] + "emotion")
          m = JSON.parse(m)
          if(m !== null && m["emotion"] == "meh"){
            this.myMovieArrFiltered.splice(i,1)
            i--;
          }
        }
    }
    return this.myMovieArrFiltered;
  }

  scrollUp(){
        var rootElement = document.documentElement;
        rootElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}
