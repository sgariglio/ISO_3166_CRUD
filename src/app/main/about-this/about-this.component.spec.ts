import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutThisComponent } from './about-this.component';

describe('AboutThisComponent', () => {
  let component: AboutThisComponent;
  let fixture: ComponentFixture<AboutThisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutThisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
