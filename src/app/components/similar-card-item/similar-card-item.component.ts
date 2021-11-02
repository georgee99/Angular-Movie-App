import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from 'src/app/IMovie';

@Component({
  selector: 'app-similar-card-item',
  templateUrl: './similar-card-item.component.html',
  styleUrls: ['./similar-card-item.component.css']
})
export class SimilarCardItemComponent implements OnInit {
  
  @Input() movie!: IMovie;
  constructor() { }

  ngOnInit(): void {
  }

}
