import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GdpPerformance } from './gdp-performance';

describe('GdpPerformance', () => {
  let component: GdpPerformance;
  let fixture: ComponentFixture<GdpPerformance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdpPerformance],
    }).compileComponents();

    fixture = TestBed.createComponent(GdpPerformance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
