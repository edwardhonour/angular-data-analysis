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
    LocalTopNavbarComponent
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
