import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { CardItemComponent } from 'src/app/components/card-item/card-item.component'
import { MoviePageComponent } from '../movie-page/movie-page.component'
import { appRoutes } from '../../app.module'
import { MovieService } from 'src/app/services/movie.service';
import { ShortenPipe } from 'src/app/shorten.pipe';
import { FilterPipe } from 'src/app/filter.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
// import 

fdescribe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardItemComponent, ShortenPipe],
      imports: [HttpClientModule, RouterModule.forRoot([]), NzCardModule],
      providers: [MovieService, FilterPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take you to movie page', fakeAsync(() => {
    const expectedRoute = { path: 'moviePage/:id', component: MoviePageComponent }
    expect(appRoutes).toContain(expectedRoute)
  }))
});
