import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantGroupsComponent } from './tenant-groups.component';

describe('TenantGroupsComponent', () => {
  let component: TenantGroupsComponent;
  let fixture: ComponentFixture<TenantGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
