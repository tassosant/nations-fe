import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GdpPerformancePageComponent } from './gdp-performance-page.component';

describe('GdpPerformance', () => {
  let component: GdpPerformancePageComponent;
  let fixture: ComponentFixture<GdpPerformancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdpPerformancePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GdpPerformancePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
