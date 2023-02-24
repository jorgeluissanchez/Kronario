import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularSplitModule } from 'angular-split';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PicComponent } from './pic/pic.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeComponent } from './tree/tree.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent, PicComponent, TreeComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularSplitModule, TreeViewModule, BrowserAnimationsModule, HttpClientModule, HttpClientJsonpModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
