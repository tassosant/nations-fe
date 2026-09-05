import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatisticsPageComponent } from './statistics-page.component';
import { StatisticsService } from '../../services/statistics.service';

describe('Statistics', () => {
  let component: StatisticsPageComponent;
  let fixture: ComponentFixture<StatisticsPageComponent>;
  let getRegionsCalls: number;
  let getStatisticsCalls: number;

  beforeEach(async () => {
    getRegionsCalls = 0;
    getStatisticsCalls = 0;

    await TestBed.configureTestingModule({
      imports: [StatisticsPageComponent],
      providers: [
        {
          provide: StatisticsService,
          useValue: {
            getRegions: () => {
              getRegionsCalls++;

              return of({
                regions: [
                  {
                    id: 1,
                    name: 'Asia',
                  },
                ],
              });
            },
            getStatistics: () => {
              getStatisticsCalls++;

              return of({
                statistics: [
                  {
                    id: 1,
                    continent_name: 'Asia',
                    region_name: 'Asia',
                    country_name: 'India',
                    population: '1234567890',
                    year: 1980,
                    gdp: '1234567890',
                  },
                ],
              });
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render regions and statistics returned by the service', () => {
    const text = fixture.nativeElement.textContent;

    expect(getRegionsCalls).toBe(1);
    expect(getStatisticsCalls).toBe(1);
    expect(text).toContain('Asia');
    expect(text).toContain('India');
    expect(text).toContain('1980');
    expect(text).toContain('1234567890');
  });
});
