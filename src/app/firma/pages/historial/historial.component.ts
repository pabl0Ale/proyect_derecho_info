import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirmaService } from '../../services/firma.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  MostrarArchivoPDf:boolean = false
  _id: string = ''
  urlFileHistorialPdf: any ;
  datosUser: any;
  datosHistorial: any ;
  constructor(  private activedRoute: ActivatedRoute,
    private firmarService: FirmaService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activedRoute.params
      .subscribe((id)=>{
        this._id = id['id']
        this.firmarService.HistorialDocumentos(this._id)
        .subscribe((e)=>{
          this.datosHistorial =  e.body;
        })
        this.firmarService.obtenerUser(this._id)
        .subscribe((e)=>{
         this.datosUser = e.body[0]
         console.log(this.datosUser);

        })

      })
  }

  verArchivoHistorial(e:any){
    for (let i = 0; i < this.datosHistorial.length; i++) {
      if ( this.datosHistorial[i]._id == e.target.id ) {
        this.urlFileHistorialPdf =  this.datosHistorial[i].pdf;
      }
    }
    this.MostrarArchivoPDf = true
  }
}
