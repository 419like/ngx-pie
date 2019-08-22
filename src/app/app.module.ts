import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PieComponent } from '../components/pie/pie';
import { CanvasPieComponent } from './canvas-pie/canvas-pie.component'

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    CanvasPieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
