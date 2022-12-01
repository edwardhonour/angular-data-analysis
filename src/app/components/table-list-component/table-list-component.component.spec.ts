import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListComponentComponent } from './table-list-component.component';

describe('TableListComponentComponent', () => {
  let component: TableListComponentComponent;
  let fixture: ComponentFixture<TableListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
