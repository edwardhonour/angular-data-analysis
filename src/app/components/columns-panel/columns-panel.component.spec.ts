import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsPanelComponent } from './columns-panel.component';

describe('ColumnsPanelComponent', () => {
  let component: ColumnsPanelComponent;
  let fixture: ComponentFixture<ColumnsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
