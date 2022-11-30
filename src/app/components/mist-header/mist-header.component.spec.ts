import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistHeaderComponent } from './mist-header.component';

describe('MistHeaderComponent', () => {
  let component: MistHeaderComponent;
  let fixture: ComponentFixture<MistHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MistHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
