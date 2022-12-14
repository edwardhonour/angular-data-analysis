import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFeatureColumnsFormComponent } from './select-feature-columns-form.component';

describe('SelectFeatureColumnsFormComponent', () => {
  let component: SelectFeatureColumnsFormComponent;
  let fixture: ComponentFixture<SelectFeatureColumnsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFeatureColumnsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFeatureColumnsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
