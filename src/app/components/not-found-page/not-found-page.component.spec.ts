import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPageComponent } from './not-found-page.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;
  let spectator: Spectator<NotFoundPageComponent>;
  const createComponent = createComponentFactory(NotFoundPageComponent);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    spectator = createComponent()
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 404 message', ()=> {
    let title = spectator.query('p');
    expect(title).toContain("404")
  })
});
