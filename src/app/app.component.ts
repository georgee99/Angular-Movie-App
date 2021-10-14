import { Component } from '@angular/core';
import { MovieService } from './services/movie.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'test-angular-app';
  // Change this title later on to something legitimate

  constructor(private movie: MovieService){
  }
}
