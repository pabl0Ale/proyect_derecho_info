import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirmaService } from '../../services/firma.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit {

  mostarAutorFirma: boolean = false
  ocultarBtnFile: boolean = true
  datosFIleFirmado: any;
  urlPDFFile: any;
  firma: String = '';
  _id: string = ''
  datosUser: any;
  constructor(  private activedRoute: ActivatedRoute,
                private firmarService: FirmaService,
                private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activedRoute.params
      .subscribe((id)=>{
        this._id = id['id']
        this.firmarService.obtenerUser(this._id)
        .subscribe((e)=>{
         this.datosUser = e.body[0]
        })
      })
  }

  ObtnerPDF(e:any){
    this.extraerBase64(e.target.files[0]).then((e:any)=>{
      this.urlPDFFile = e.base
      this.ocultarBtnFile = !this.ocultarBtnFile
    })
  }

  ObtnerCodigoFirma(){
    this.firmarService.VerificarDocumento( this.firma)
      .subscribe((e)=>{
        this.datosFIleFirmado = e.body
        this.mostarAutorFirma = true
      })
  }

  CerrarConsultaFirma(){
    this.mostarAutorFirma = false
  }

  LimPanVerificacion(){
    this.ocultarBtnFile = !this.ocultarBtnFile;
    this.firma = '';
    this.urlPDFFile = ''
  }


















  //sirve para converit el pdf en base64
  extraerBase64 = async ($event: any) => new Promise( (resolve):any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}
