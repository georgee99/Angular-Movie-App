import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { faSmile, faSadCry, faMeh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  movieId: any;
  movieIdInt: number;
  movieName: any;
  moviePoster: any;
  movieOverview: any;
  moviePop: number;
  newMovieArr: any = [];
  similarMovies: any = [];
  movieEmotionObj: any = {};
  // Icons
  faSmile = faSmile;
  faSadCry = faSadCry;
  faMeh = faMeh;
  
  constructor(private route: ActivatedRoute, private movie: MovieService) { }

  ngOnInit(): void { 

    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      this.movieIdInt = parseInt(this.movieId)
      console.log("Movie Id: " + this.movieIdInt)
    })

    this.movie.getMovies().subscribe(movie => {
      this.newMovieArr = movie;
      for(let i = 0; i<this.newMovieArr.length; i++){
        if(this.movieIdInt === this.newMovieArr[i]["id"]){
          console.log("movie id " + this.movieIdInt)
          this.movieName = this.newMovieArr[i]["original_title"]
          console.log("movie name: " + this.movieName)
          this.moviePoster = this.newMovieArr[i]["poster_path"]
          this.movieOverview = this.newMovieArr[i]["overview"]
          this.moviePop = this.newMovieArr[i]["popularity"]
        }
      }
    })

    // Retrieving similar movies
    this.movie.getSimilarMovies(this.movieId).subscribe(movie => {
      this.similarMovies = movie;
      this.similarMovies = this.similarMovies.slice(0,6)
      console.log(this.similarMovies)
    })
  }

  getLocalStorage():any{
    return localStorage.getItem(this.movieId + "emotion")
  }
  
  clickSmile():void {
    this.movieEmotionObj = {
      "movieId": this.movieIdInt,
      "emotion": "happy",
      "count": 0
    }
    this.movieEmotionObj["count"] ++;
    // every second click, increment the count 
    let em:any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if(em != null && em["emotion"] == "happy"){
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      alert("You have tagged this movie as happy")
    }
  }

  clickSad():void {
    this.movieEmotionObj = {
      "movieId": this.movieIdInt,
      "emotion": "sad",
      "count": 0
    }
    this.movieEmotionObj["count"] ++;

    let em:any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if(em != null && em["emotion"] == "sad"){
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      alert("You have tagged this movie as sad")

    }  
  }

  clickMeh(): void {
    console.log("Click Meh works")
    this.movieEmotionObj = {
      "movieId": this.movieIdInt,
      "emotion": "meh",
      "count": 0
    }
    this.movieEmotionObj["count"] ++;

    let em:any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if(em != null && em["emotion"] == "meh"){
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      alert("You have tagged this movie as meh")
    }
  }

  deleteThisMovie(){
    let res = confirm("Are you sure? You cannot undo this action")
    if(res == true){
      localStorage.setItem(this.movieId + 'toDelete', this.movieId)
    }
    alert(this.movieName + " has been deleted")
  }
}
