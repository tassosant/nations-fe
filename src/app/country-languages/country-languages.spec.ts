import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryLanguages } from './country-languages';

describe('CountryLanguages', () => {
  let component: CountryLanguages;
  let fixture: ComponentFixture<CountryLanguages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryLanguages],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryLanguages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
