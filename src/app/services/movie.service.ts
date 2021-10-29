import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  getMovies(): Observable<any>{
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&with_genres=878"
    return this.http.get(url).pipe(map((data: any) => data.results))

  }

  getSimilarMovies(id: number){
    let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=b45808cfc639faa44235410b835b0912`
    return this.http.get(url).pipe(map((data: any) => data.results))
  }
}
