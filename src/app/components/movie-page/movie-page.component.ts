import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { faSmile, faSadCry, faMeh } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from 'src/app/IMovie';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  movieId: any;
  movieIdInt!: number;
  movieName!: string;
  moviePoster!: string;
  movieOverview!: string;
  moviePop!: number;
  newMovieArr: IMovie[] = [];
  similarMovies: IMovie[] = [];
  similarMovieID: any;
  similarMovieName !: string;
  similarMoviePoster !: string;
  similarMovieOverview !: string;
  movieEmotionObj: Object = {};
  // Icons
  faSmile = faSmile;
  faSadCry = faSadCry;
  faMeh = faMeh;

  constructor(private route: ActivatedRoute, private movie: MovieService) { }

  ngOnInit(): void { 
    // Getting movie id
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      this.movieIdInt = parseInt(this.movieId)
    })

    this.movie.getMovies().subscribe(movie => {
      this.newMovieArr = movie;
      for(let i = 0; i<this.newMovieArr.length; i++){
        if(this.movieIdInt === this.newMovieArr[i]["id"]){
          this.movieName = this.newMovieArr[i]["original_title"]
          this.moviePoster = this.newMovieArr[i]["poster_path"]
          this.movieOverview = this.newMovieArr[i]["overview"]
          this.moviePop = this.newMovieArr[i]["popularity"]
        }
      }
    })

    // Retrieving similar movies
    this.movie.getSimilarMovies(this.movieId).subscribe(movie => {
      this.similarMovies = movie;
      this.similarMovies = this.similarMovies.slice(0,6);
      console.log(`we have the movies ${this.similarMovies.length}`);
    })
  }

  clickSmile():void {
    this.movieEmotionObj = {
      "movieId": this.movieIdInt,
      "emotion": "happy"
    }
    let count:any = localStorage.getItem(this.movieId + 'clickCountHappy')
    if(count == null){ 
      localStorage.setItem(this.movieId + 'clickCountHappy', "1")
    }
    let em:any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if(em != null && em["emotion"] == "happy"){
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      count++;
      localStorage.setItem(this.movieId + 'clickCountHappy', count)
      alert("You have tagged this movie as happy")
    }
  }

  clickSad():void {
    this.movieEmotionObj = {
      "movieId": this.movieIdInt,
      "emotion": "sad"
    }
    let count:any = localStorage.getItem(this.movieId + 'clickCountSad')
    if(count == null){ 
      localStorage.setItem(this.movieId + 'clickCountSad', "1")
    }
    let em:any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if(em != null && em["emotion"] == "sad"){
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      count++;
      localStorage.setItem(this.movieId + 'clickCountSad', count)
      alert("You have tagged this movie as sad")

    }  
  }

  clickMeh(): void {
    console.log("Click Meh works")
    this.movieEmotionObj = {
      "movieId": this.movieIdInt,
      "emotion": "meh"
    }
    let count:any = localStorage.getItem(this.movieId + 'clickCountMeh')
    if(count == null){ 
      localStorage.setItem(this.movieId + 'clickCountMeh', "1")
    }
    let em:any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if(em != null && em["emotion"] == "meh"){
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      count++;
      localStorage.setItem(this.movieId + 'clickCountMeh', count)
      alert("You have tagged this movie as meh")
    }
  }

  getSmileClickCount(){
    let count:any = localStorage.getItem(this.movieId + 'clickCountHappy');
    return count!=null ? Math.ceil(count) : 0;
  }

  getSadClickCount(){
    let count:any = localStorage.getItem(this.movieId + 'clickCountSad');
    return count!=null ? Math.ceil(count) : 0;
  }

  getMehClickCount(){
    let count:any = localStorage.getItem(this.movieId + 'clickCountMeh');
    return count!=null ? Math.ceil(count) : 0;
  }

  deleteThisMovie(){
    let res = confirm("Are you sure? You cannot undo this action")
    if(res == true){
      localStorage.setItem(this.movieId + 'toDelete', this.movieId)
      console.log(localStorage.getItem(this.movieId + 'toDelete'))
      alert(this.movieName + " has been deleted")
    }
  }

  removeAllEmotions(){
    localStorage.removeItem(this.movieId + "emotion")
    alert("Emotions have been untagged")
  }
}