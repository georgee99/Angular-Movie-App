import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable } from 'rxjs';
import { map } from "rxjs/operators"; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  getMovies(): Observable<any>{
    const url1 = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=1&with_genres=878`
    const url2 = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=2&with_genres=878`
    const url3 = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=3&with_genres=878`
    const url4 = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=4&with_genres=878`
    const url5 = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=5&with_genres=878`
    
    const page1 = this.http.get(url1).pipe(map((data: any) => data.results));
    const page2 = this.http.get(url2).pipe(map((data: any) => data.results));
    const page3 = this.http.get(url3).pipe(map((data: any) => data.results));
    const page4 = this.http.get(url4).pipe(map((data: any) => data.results));
    const page5 = this.http.get(url5).pipe(map((data: any) => data.results));

    const pages = [page1, page2, page3, page4, page5];

    return forkJoin(pages).pipe(map((page: any) => {
      return [].concat(...page);
    }))
  }

  getSimilarMovies(id: number){
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
