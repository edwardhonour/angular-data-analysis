import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnAccordionComponent } from './column-accordion.component';

describe('ColumnAccordionComponent', () => {
  let component: ColumnAccordionComponent;
  let fixture: ComponentFixture<ColumnAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
