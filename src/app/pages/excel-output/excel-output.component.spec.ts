import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelOutputComponent } from './excel-output.component';

describe('ExcelOutputComponent', () => {
  let component: ExcelOutputComponent;
  let fixture: ComponentFixture<ExcelOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
