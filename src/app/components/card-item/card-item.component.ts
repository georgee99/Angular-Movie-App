import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from 'src/app/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})

export class CardItemComponent implements OnInit {

  @Input() movie!: IMovie;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  setSelectedMovieId(id: number) {
    this.movieService.setSelectedMovieId(id);
  }

  sanitizeString(inputString: string): string {
    const sanitizedString = decodeURIComponent(inputString);
    const cleanedString = sanitizedString.replace(/[^\x00-\x7F]+/g, '');

    return cleanedString.replace(/\s/g, '-');
  }
}
