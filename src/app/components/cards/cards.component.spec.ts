import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { By } from '@angular/platform-browser';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    // fixture.autoDetectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load images', () => {
    // let thing = fixture.debugElement.query(By.css('.cards'))
    fixture = TestBed.createComponent(CardsComponent);

    fixture.detectChanges();
    let thing = fixture.debugElement.nativeElement.query('app-card-item')
    expect(thing).toBeTruthy()
  })

  it('checkbox should be checked', ()=>{
    let checkbox = fixture.debugElement.nativeElement.querySelector('label');
    expect(checkbox).toBeTruthy()

  })
});
