import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataResolver } from './data.resolver';
import { ExcelOutputComponent } from './pages/excel-output/excel-output.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MapOutputComponent } from './pages/map-output/map-output.component';
import { OptionsListComponent } from './pages/options-list/options-list.component';
import { ReportOutputComponent } from './pages/report-output/report-output.component';
import { RiskOutputComponent } from './pages/risk-output/risk-output.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, resolve: { data: DataResolver } },
  { path: 'home', component: LandingPageComponent, resolve: { data: DataResolver } },
  { path: 'report', component: ReportOutputComponent, resolve: { data: DataResolver } },
  { path: 'excel', component: ExcelOutputComponent, resolve: { data: DataResolver } },
  { path: 'map', component: MapOutputComponent, resolve: { data: DataResolver } },
  { path: 'risk', component: RiskOutputComponent, resolve: { data: DataResolver } },
  { path: 'options', component: OptionsListComponent, resolve: {data: DataResolver } },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
