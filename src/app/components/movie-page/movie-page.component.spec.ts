import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MoviePageComponent } from './movie-page.component';
import { HttpErrorResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('MoviePageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePageComponent ],
      imports: [ RouterModule.forRoot([]) , HttpClientModule]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it("should load similar movies", ()=>{
  //   maybe do in movie service test component
  // })

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
    fixture.whenStable().then(()=> {
      expect(component.deleteThisMovie).toHaveBeenCalled()
    })
  }) )

  it('emotions button should be called', fakeAsync(()=>{
    let emotionButtons = fixture.debugElement.nativeElement.query('.smileEm.sadEm.mehEm');
    // spyOn(component, 'clickSmile')
    // spyOn(component, 'clickSad')
    // spyOn(component, 'clickMeh');
    emotionButtons.click();
    tick();
    fixture.whenStable().then(()=> {
      expect(component.clickSmile).toHaveBeenCalled()
      // expect(component.clickSad).toHaveBeenCalled()
      // expect(component.clickMeh).toHaveBeenCalled()
      // Haven't made these methods yet
    })
  }))
});
