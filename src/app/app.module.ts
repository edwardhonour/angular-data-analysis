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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LandingPageComponent,
    MistHeaderComponent,
    MistFooterComponent
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
