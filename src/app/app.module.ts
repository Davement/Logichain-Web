import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogiMenuModule } from './components/logi-menu/logi-menu.module';
import { LogiBreadcrumbModule } from './components/logi-breadcrumb/logi-breadcrumb.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LogiMenuModule,
    LogiBreadcrumbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
