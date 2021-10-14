import { Component, OnInit, Input } from '@angular/core';
import { MoviesInt } from 'src/app/MoviesInt';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})

export class CardItemComponent implements OnInit {

  @Input() movie: any;

  constructor() { }

  ngOnInit(): void {
  }

}
