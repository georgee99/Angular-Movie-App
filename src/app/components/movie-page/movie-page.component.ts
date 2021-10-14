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
  movieName: any;
  constructor(private route: ActivatedRoute, private movie: MovieService) { }

  ngOnInit(): void {

    // Load related movies here
    // https://api.themoviedb.org/3/movie/550/similar?api_key=b45808cfc639faa44235410b835b0912

    this.route.paramMap.subscribe(params => {
      // console.log(params); Parse Int if it doesnt work
      this.movieId = params.get('id');
      console.log("Movie id: " + this.movieId)
      this.movieName = params.get('title');
      console.log("Movie name: " + this.movieName)
    })
  }
}
