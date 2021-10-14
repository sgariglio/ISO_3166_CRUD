import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionBuildComponent } from './subdivision-build.component';

describe('SubdivisionBuildComponent', () => {
  let component: SubdivisionBuildComponent;
  let fixture: ComponentFixture<SubdivisionBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdivisionBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
