import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from 'src/app/IMovie';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})

export class CardItemComponent implements OnInit {

  @Input() movie!: IMovie;

  constructor() { }

  ngOnInit(): void {
  }

}
