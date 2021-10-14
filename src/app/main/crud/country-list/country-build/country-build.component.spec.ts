import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryBuildComponent } from './country-build.component';

describe('CountryBuildComponent', () => {
  let component: CountryBuildComponent;
  let fixture: ComponentFixture<CountryBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
