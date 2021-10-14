import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
// import { NzDemoCardFlexibleContentComponent} from './CustomImgCard'
import { AppComponent } from './app.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CardItemComponent } from './components/card-item/card-item.component';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';

const appRoutes: Routes = [
  {path: '', component: CardsComponent}, //Home page has empty string for route path
  {path: 'moviePage/:id/:title/:poster_path/:overview', component: MoviePageComponent},
  {path: 'moviePage', component: MoviePageComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    CardItemComponent,
    MoviePageComponent,
    HeaderComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NzButtonModule,
    NzCardModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
