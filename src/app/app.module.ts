import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEditorModule } from 'ngx-editor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MistHeaderComponent } from './components/mist-header/mist-header.component';
import { MistFooterComponent } from './components/mist-footer/mist-footer.component';
import { TableListComponentComponent } from './components/table-list-component/table-list-component.component';
import { TenantGroupsComponent } from './pages/tenant-groups/tenant-groups.component';
import { BasicFormComponentComponent } from './components/basic-form-component/basic-form-component.component';
import { EditTenantGroupComponent } from './pages/edit-tenant-group/edit-tenant-group.component';
import { LocalTopNavbarComponent } from './components/local-top-navbar/local-top-navbar.component';
import { BootstrapAccordionComponent } from './components/bootstrap-accordion/bootstrap-accordion.component';
import { ResultsPanelComponent } from './components/results-panel/results-panel.component';
import { SelectionsPanelComponent } from './components/selections-panel/selections-panel.component';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { ColumnsPanelComponent } from './components/columns-panel/columns-panel.component';
import { CriteriaPanelComponent } from './components/criteria-panel/criteria-panel.component';
import { FacilityFiltersComponent } from './pages/facility-filters/facility-filters.component';
import { ColumnSelectionComponent } from './pages/column-selection/column-selection.component';
import { ReportOutputComponent } from './pages/report-output/report-output.component';
import { ExcelOutputComponent } from './pages/excel-output/excel-output.component';
import { MapOutputComponent } from './pages/map-output/map-output.component';
import { RiskOutputComponent } from './pages/risk-output/risk-output.component';
import { FilterAccordionComponent } from './components/filter-accordion/filter-accordion.component';
import { ColumnAccordionComponent } from './components/column-accordion/column-accordion.component';
import { SaveSearchComponent } from './components/save-search/save-search.component';
import { ShareReportComponent } from './components/share-report/share-report.component';
import { ThreatDatasetComponent } from './components/threat-dataset/threat-dataset.component';
import { CountPanelComponent } from './components/count-panel/count-panel.component';
import { CriteriaSearchComponent } from './components/criteria-search/criteria-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LandingPageComponent,
    MistHeaderComponent,
    MistFooterComponent,
    TableListComponentComponent,
    TenantGroupsComponent,
    BasicFormComponentComponent,
    EditTenantGroupComponent,
    LocalTopNavbarComponent,
    BootstrapAccordionComponent,
    ResultsPanelComponent,
    SelectionsPanelComponent,
    FiltersPanelComponent,
    ColumnsPanelComponent,
    CriteriaPanelComponent,
    FacilityFiltersComponent,
    ColumnSelectionComponent,
    ReportOutputComponent,
    ExcelOutputComponent,
    MapOutputComponent,
    RiskOutputComponent,
    FilterAccordionComponent,
    ColumnAccordionComponent,
    SaveSearchComponent,
    ShareReportComponent,
    ThreatDatasetComponent,
    CountPanelComponent,
    CriteriaSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxTablePaginationModule,
    Ng2SearchPipeModule,
    NgxEditorModule
  ],
  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
