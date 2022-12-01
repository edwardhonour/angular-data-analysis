import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenantGroupComponent } from './edit-tenant-group.component';

describe('EditTenantGroupComponent', () => {
  let component: EditTenantGroupComponent;
  let fixture: ComponentFixture<EditTenantGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTenantGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTenantGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
