import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateOperacionesComponent } from './template-main.component';

describe('TemplateOperacionesComponent', () => {
  let component: TemplateOperacionesComponent;
  let fixture: ComponentFixture<TemplateOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateOperacionesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
