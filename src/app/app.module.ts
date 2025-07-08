import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppComponent } from './app.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CardItemComponent } from './components/card-item/card-item.component';
import { RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { SimilarCardItemComponent } from './components/similar-card-item/similar-card-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ShortenPipe as ShortenPipe } from './shorten.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

export const appRoutes: Routes = [
  { path: '', component: CardsComponent }, // Home page has empty string for route path
  { path: ':movieName', component: MoviePageComponent },
  { path: '**', component: NotFoundPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CardItemComponent,
    MoviePageComponent,
    HeaderComponent,
    CardsComponent,
    SimilarCardItemComponent,
    NotFoundPageComponent,
    ShortenPipe,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
