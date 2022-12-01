import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataResolver } from './data.resolver';
import { EditTenantGroupComponent } from './pages/edit-tenant-group/edit-tenant-group.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TenantGroupsComponent } from './pages/tenant-groups/tenant-groups.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, resolve: { data: DataResolver } },
  { path: 'home', component: HomePageComponent, resolve: { data: DataResolver } },
  { path: 'tenant-groups', component: TenantGroupsComponent, resolve: { data: DataResolver } },
  { path: 'edit-tenant-group/:id', component: EditTenantGroupComponent, resolve: { data: DataResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
