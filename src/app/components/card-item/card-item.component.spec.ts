import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import {CardItemComponent} from 'src/app/components/card-item/card-item.component'
import { MoviePageComponent } from '../movie-page/movie-page.component'
import {appRoutes} from '../../app.module'

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemComponent ],
      imports: [ HttpClientModule, RouterModule.forRoot([]) ]
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

  it('should take you to movie page', fakeAsync(()=>{
    const expectedRoute = {path: 'moviePage/:id', component: MoviePageComponent}
    expect(appRoutes).toContain(expectedRoute)
  }))
});
