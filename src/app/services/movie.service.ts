import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    const genreId = 878;
    const totalPages = 5;
    const requests = Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=${page}&with_genres=${genreId}`;
      return this.http.get<any>(url).pipe(map(data => data.results));
    });

    return forkJoin(requests).pipe(map((page: any) => {
      return [].concat(...page);
    }))
  }

  getSimilarMovies(id: number) {
    let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${environment.apiKey}`
    return this.http.get(url).pipe(map((data: any) => data.results))
  }

  private selectedMovieId: number | null = null;

  setSelectedMovieId(id: number) {
    this.selectedMovieId = id;
  }

  getSelectedMovieId(): number | null {
    return this.selectedMovieId;
  }
}
