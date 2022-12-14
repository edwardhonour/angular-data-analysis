import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFeaturesFormComponent } from './select-features-form.component';

describe('SelectFeaturesFormComponent', () => {
  let component: SelectFeaturesFormComponent;
  let fixture: ComponentFixture<SelectFeaturesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFeaturesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFeaturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
