import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFilterFormComponent } from './select-filter-form.component';

describe('SelectFilterFormComponent', () => {
  let component: SelectFilterFormComponent;
  let fixture: ComponentFixture<SelectFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFilterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
