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
  movieName: string | null = "";
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
      this.movieId = this.movie.getSelectedMovieId();
      let paramTitle = params.get('movieName');
      this.movieName = this.removeHyphens(paramTitle!);
    })

    this.movie.getMovies().subscribe(movie => {
      this.newMovieArr = movie;
      for (let i = 0; i < this.newMovieArr.length; i++) {
        if (this.movieId === this.newMovieArr[i]["id"]) {
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
      this.similarMovies = this.similarMovies.slice(0, 6);
    })
  }

  clickEmotion(emotion: string): void {
    console.log("Click " + emotion + " works")
    this.movieEmotionObj = {
      "movieId": this.movieId,
      "emotion": emotion
    }
    let count: any = localStorage.getItem(this.movieId + 'clickCount' + emotion)
    if (count == null) {
      localStorage.setItem(this.movieId + 'clickCount' + emotion, "1")
    }
    let em: any = localStorage.getItem(this.movieId + "emotion")
    em = JSON.parse(em)
    if (em != null && em["emotion"] == emotion) {
      // remove emotion
      localStorage.removeItem(this.movieId + "emotion")
      alert("You have untagged this emotion")
    } else {
      localStorage.setItem(this.movieId + "emotion", JSON.stringify(this.movieEmotionObj))
      count++;
      localStorage.setItem(this.movieId + 'clickCount' + emotion, count)
      alert("You have tagged this movie as " + emotion)
    }
  }

  getSmileClickCount() {
    let count: any = localStorage.getItem(this.movieId + 'clickCountHappy');
    return count != null ? Math.ceil(count) : 0;
  }

  getSadClickCount() {
    let count: any = localStorage.getItem(this.movieId + 'clickCountSad');
    return count != null ? Math.ceil(count) : 0;
  }

  getMehClickCount() {
    let count: any = localStorage.getItem(this.movieId + 'clickCountMeh');
    return count != null ? Math.ceil(count) : 0;
  }

  deleteThisMovie() {
    let res = confirm("Are you sure? You cannot undo this action")
    if (res == true) {
      localStorage.setItem(this.movieId + 'toDelete', this.movieId)
      console.log(localStorage.getItem(this.movieId + 'toDelete'))
      alert(this.movieName + " has been deleted")
    }
  }

  removeAllEmotions() {
    localStorage.removeItem(this.movieId + "emotion")
    alert("Emotions have been untagged")
  }

  removeHyphens(inputString: string): string {
    return inputString.replace(/-/g, ' ');
  }
}