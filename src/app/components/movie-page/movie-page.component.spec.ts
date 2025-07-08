import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MoviePageComponent } from './movie-page.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('MoviePageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;
  let spectator: Spectator<MoviePageComponent>;
  const createComponent = createComponentFactory(MoviePageComponent);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviePageComponent],
      imports: [RouterModule.forRoot([]), HttpClientModule]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePageComponent);
    spectator = createComponent()
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load images', () => {
    let mainImage = fixture.debugElement.query(By.css('.photo-container'))
    let similarImages = fixture.debugElement.query(By.css('.cards'))
    expect(mainImage).toBeTruthy()
    expect(similarImages).toBeTruthy()
  })

  it('delete button should be called', fakeAsync(() => {
    let deleteButton = fixture.debugElement.nativeElement.querySelector('.delete-button');
    spyOn(component, 'deleteThisMovie');
    deleteButton.click();
    tick();
    fixture.whenStable().then(() => {
      expect(component.deleteThisMovie).toHaveBeenCalled()
    })
  }))

  it('emotions button should be called', fakeAsync(() => {
    let smButton = fixture.debugElement.nativeElement.querySelector('.smileEm')
    let saButton = fixture.debugElement.nativeElement.querySelector('.sadEm')
    let meButton = fixture.debugElement.nativeElement.querySelector('.mehEm')

    spyOn(component, 'clickEmotion');

    smButton.click(); saButton.click(); meButton.click();
    fixture.whenStable().then(() => {
      expect(component.clickEmotion).toHaveBeenCalledWith('happy');
      expect(component.clickEmotion).toHaveBeenCalledWith('sad');
      expect(component.clickEmotion).toHaveBeenCalledWith('meh');
    })
  }))

  // Using Spectator comparison
  it('should render movie title', () => {
    let title = spectator.query('h1');
    expect(title).toBeTruthy()
  })

  it('should call respective functions after emotion buttons are clicked', () => {
    spectator.click('.smileEm')
    expect(spectator.component.clickEmotion).toHaveBeenCalledWith('happy')

    spectator.click('.sadEm')
    expect(spectator.component.clickEmotion).toHaveBeenCalledWith('sad')

    spectator.click('.mehEm')
    expect(spectator.component.clickEmotion).toHaveBeenCalledWith('meh')
  })
});
