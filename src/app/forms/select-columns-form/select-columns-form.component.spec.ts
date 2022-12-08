import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColumnsFormComponent } from './select-columns-form.component';

describe('SelectColumnsFormComponent', () => {
  let component: SelectColumnsFormComponent;
  let fixture: ComponentFixture<SelectColumnsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectColumnsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectColumnsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
