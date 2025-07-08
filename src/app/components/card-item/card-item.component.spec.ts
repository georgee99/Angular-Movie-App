import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CardItemComponent } from 'src/app/components/card-item/card-item.component'
import { MoviePageComponent } from '../movie-page/movie-page.component'
import { appRoutes } from '../../app.module'
import { MovieService } from 'src/app/services/movie.service';
import { ShortenPipe } from 'src/app/shorten.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';

fdescribe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardItemComponent, ShortenPipe],
      imports: [HttpClientModule, RouterModule.forRoot([]), NzCardModule],
      providers: [MovieService]
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
