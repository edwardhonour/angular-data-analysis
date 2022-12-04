import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapAccordionComponent } from './bootstrap-accordion.component';

describe('BootstrapAccordionComponent', () => {
  let component: BootstrapAccordionComponent;
  let fixture: ComponentFixture<BootstrapAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootstrapAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
