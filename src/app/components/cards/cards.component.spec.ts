import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards.component';
import { MovieService } from 'src/app/services/movie.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { ShortenPipe } from 'src/app/shorten.pipe';
import { Spectator, createComponentFactory, SpyObject } from '@ngneat/spectator';
import { IMovie } from 'src/app/IMovie';
import { of } from 'rxjs';

const mockMovie: IMovie = {
  "adult": false,
  "backdrop_path": "/3nv2TEz2u178xPXzdKlZdUh5uOI.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "homepage": "http://www.foxmovies.com/movies/fight-club",
  "id": 550,
  "original_title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
  "popularity": 51.752,
  "poster_path": "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
  
  "status": "Released",
  "tagline": "Mischief. Mayhem. Soap.",
  "title": "Fight Club",
  "video": false,
  "vote_average": 8.4,
  "vote_count": 22692
};

describe('CardsComponent', () => {
  let spectator: Spectator<CardsComponent>;
  let mockMovieService: SpyObject<MovieService>;

  const createComponent = createComponentFactory({
    component: CardsComponent,
    declarations: [CardsComponent],
    imports: [HttpClientModule],
    providers: [ShortenPipe, FilterPipe],
    mocks: [MovieService],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    mockMovieService = spectator.inject(MovieService);
  });

  it('should load images', () => {
    spectator.detectChanges();
    const theCards = spectator.queryAll('.the-cards');
    expect(theCards).toBeTruthy()
  })

  it('should be able to check the happy checkbox and it does\'t show any movies', () => {
    // arrange
    mockMovieService.getMovies.and.returnValue(of(mockMovie));
    // act
    spectator.click('#cb-hap');
    
    // assert
    expect(spectator.component.myMovieArrFiltered.length).toBe(0);
  })
  
  it('should be able to check the sad checkbox and it only shows sad movies ', () => {
    // arrange
    mockMovieService.getMovies.and.returnValue(of(mockMovie));
    
    // act
    spectator.click('#cb-sad');
    
    // assert
    expect(spectator.component.myMovieArrFiltered.length).toBe(0);
  })

  it('should be able to check the meh checkbox and it only shows meh movies ', () => {
    // arrange
    mockMovieService.getMovies.and.returnValue(of(mockMovie));

    // act
    spectator.click('#cb-sad');

    // assert
    expect(spectator.component.myMovieArrFiltered.length).toBe(0);
  })
});
