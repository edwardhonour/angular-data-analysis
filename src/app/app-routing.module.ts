import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataResolver } from './data.resolver';
import { ColumnSelectionComponent } from './pages/column-selection/column-selection.component';
import { EditTenantGroupComponent } from './pages/edit-tenant-group/edit-tenant-group.component';
import { ExcelOutputComponent } from './pages/excel-output/excel-output.component';
import { FacilityFiltersComponent } from './pages/facility-filters/facility-filters.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MapOutputComponent } from './pages/map-output/map-output.component';
import { ReportOutputComponent } from './pages/report-output/report-output.component';
import { RiskOutputComponent } from './pages/risk-output/risk-output.component';
import { TenantGroupsComponent } from './pages/tenant-groups/tenant-groups.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, resolve: { data: DataResolver } },
  { path: 'home', component: LandingPageComponent, resolve: { data: DataResolver } },
  { path: 'filter', component: FacilityFiltersComponent, resolve: { data: DataResolver } },
  { path: 'columns', component: ColumnSelectionComponent, resolve: { data: DataResolver } },
  { path: 'report', component: ReportOutputComponent, resolve: { data: DataResolver } },
  { path: 'excel', component: ExcelOutputComponent, resolve: { data: DataResolver } },
  { path: 'map', component: MapOutputComponent, resolve: { data: DataResolver } },
  { path: 'risk', component: RiskOutputComponent, resolve: { data: DataResolver } },
  { path: 'tenant-groups', component: TenantGroupsComponent, resolve: { data: DataResolver } },
  { path: 'edit-tenant-group/:id', component: EditTenantGroupComponent, resolve: { data: DataResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
