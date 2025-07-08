import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimilarCardItemComponent } from './similar-card-item.component';

describe('SimilarCardItemComponent', () => {
  let component: SimilarCardItemComponent;
  let fixture: ComponentFixture<SimilarCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimilarCardItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
