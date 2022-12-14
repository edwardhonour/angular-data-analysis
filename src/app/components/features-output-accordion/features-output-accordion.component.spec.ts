import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesOutputAccordionComponent } from './features-output-accordion.component';

describe('FeaturesOutputAccordionComponent', () => {
  let component: FeaturesOutputAccordionComponent;
  let fixture: ComponentFixture<FeaturesOutputAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesOutputAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesOutputAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
