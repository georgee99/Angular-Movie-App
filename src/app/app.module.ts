import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { AppComponent } from './app.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CardItemComponent } from './components/card-item/card-item.component';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { SimilarCardItemComponent } from './components/similar-card-item/similar-card-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from './filter.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ShortenPipePipe } from './shorten-pipe.pipe';

export const appRoutes: Routes = [
  {path: '', component: CardsComponent}, //Home page has empty string for route path
  {path: 'moviePage/:id', component: MoviePageComponent},
  {path: '**', component: NotFoundPageComponent}
  // {path: 'moviePage', component: MoviePageComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CardItemComponent,
    MoviePageComponent,
    HeaderComponent,
    CardsComponent,
    SimilarCardItemComponent,
    FilterPipe,
    NotFoundPageComponent,
    ShortenPipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
