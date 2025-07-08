import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  myMovieArr: IMovie[] = [];
  filteredMovies: IMovie[] = [];
  searchText: any;
  p: number = 1;

  filters = {
    happy: false,
    sad: false,
    meh: false
  };

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      const visibleMovies = movies.filter(movie => {
        const isDeleted = localStorage.getItem(`${movie.id}toDelete`);
        return isDeleted === null;
      });
      this.myMovieArr = visibleMovies;
      this.applyFilters();
    });
  }

  toggleFilter(emotion: 'happy' | 'sad' | 'meh', checked: boolean): void {
    this.filters[emotion] = checked;
    this.applyFilters();
  }

  applyFilters(): void {
    const activeEmotions = Object.entries(this.filters)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (activeEmotions.length === 0) {
      this.filteredMovies = [...this.myMovieArr];
      return;
    }

    this.filteredMovies = this.myMovieArr.filter(movie => {
      const stored = localStorage.getItem(`${movie.id}emotion`);
      if (!stored) return false;

      try {
        const { emotion } = JSON.parse(stored);
        return activeEmotions.includes(emotion);
      } catch {
        return false;
      }
    });
  }

  scrollUp(): void {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
