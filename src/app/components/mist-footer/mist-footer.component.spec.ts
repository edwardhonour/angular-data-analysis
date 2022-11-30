import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistFooterComponent } from './mist-footer.component';

describe('MistFooterComponent', () => {
  let component: MistFooterComponent;
  let fixture: ComponentFixture<MistFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MistFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MistFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
