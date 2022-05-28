import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirmaRoutingModule } from './firma-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { Menu3Component } from './components/menu3/menu3/menu3.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { FormsModule } from '@angular/forms';
import { HistorialComponent } from './pages/historial/historial.component';


@NgModule({
  declarations: [
    HomeComponent,
    VerificarComponent,
    Menu3Component,
    NavComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    FirmaRoutingModule,
    PdfViewerModule,
    FormsModule
  ]
})
export class FirmaModule { }
