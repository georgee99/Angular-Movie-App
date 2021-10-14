import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MoviesInt } from '../MoviesInt';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let movieService: MovieService;
  let HttpClientSpy: { get: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    movieService = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });


  // Testing HTTP client
  beforeEach(() => {
    HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    movieService = new MovieService(HttpClientSpy as any);
  });

  it('should return the sci-fi movies', (done: DoneFn) => {
    const expectedMovies: MoviesInt[] = 
    [{id: 1, title: 'Venom'}] //Change this up later to match actual results, or to contain

    HttpClientSpy.get.and.returnValue(of(expectedMovies));

    movieService.getMovies().subscribe(
      movies => {
      expect(movies).withContext('some text').toContain(expectedMovies, 'expected Movies');
      done();
    },
      done.fail
    );

    expect(HttpClientSpy.get.calls.count()).toBe(1);
    });

  it('return error when 404 occurs', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, 
      statusText: 'Not Found'
    })

    HttpClientSpy.get.and.returnValue(of(errorResponse));

    movieService.getMovies().subscribe(
      movies=> done.fail('expected an error, not movies'),
      error => {
        expect(error.message).toContain('test 404 error');
        done;
      }
    );  
  })
})