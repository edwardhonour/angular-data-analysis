import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTopNavbarComponent } from './local-top-navbar.component';

describe('LocalTopNavbarComponent', () => {
  let component: LocalTopNavbarComponent;
  let fixture: ComponentFixture<LocalTopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalTopNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
