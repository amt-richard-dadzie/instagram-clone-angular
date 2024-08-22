import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreListComponent } from './explore-list.component';

describe('ExploreComponent', () => {
  let component: ExploreListComponent;
  let fixture: ComponentFixture<ExploreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
