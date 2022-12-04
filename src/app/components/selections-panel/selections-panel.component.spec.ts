import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsPanelComponent } from './selections-panel.component';

describe('SelectionsPanelComponent', () => {
  let component: SelectionsPanelComponent;
  let fixture: ComponentFixture<SelectionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
