import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

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
  similarMovies: any = [];
  newMovieArr: any = [];
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
          console.log("movie poster: " + this.moviePoster)
          this.movieOverview = this.newMovieArr[i]["overview"]
          console.log("movie overview: " + this.movieOverview)
          this.moviePop = this.newMovieArr[i]["popularity"]
          console.log("movie popularity: " + this.moviePop)
        }
      }
    })

    // Retrieving similar movies
    this.movie.getSimilarMovies(this.movieId).subscribe(movie => {
      // console.warn(movie)
      this.similarMovies = movie;
    })
  }
}
