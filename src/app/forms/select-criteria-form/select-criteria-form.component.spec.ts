import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCriteriaFormComponent } from './select-criteria-form.component';

describe('SelectCriteriaFormComponent', () => {
  let component: SelectCriteriaFormComponent;
  let fixture: ComponentFixture<SelectCriteriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCriteriaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCriteriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
