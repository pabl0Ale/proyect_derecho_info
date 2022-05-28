import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaService } from '../../services/firma.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _id: string = ''
  //esta varriable no adyua a mostrar un div en la pantalla
  irSiguiente:boolean = false;
  //obtenemos datos de la persona atraves del id  y se guarda en datosUser
  datosUser: any;
  urlPdfFile: any;
  urlPdfFileFirmado: any;
  valorBooleanOCul: boolean = true
  valorBooleanOMost: boolean = false
  constructor( private activedRoute: ActivatedRoute,
                private firmarService: FirmaService,
                private sanitizer: DomSanitizer,
                private router: Router) { }

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

//boton para obtner el pdf entu computadora
  obtnerPDF(e: any){
    this.extraerBase64(e.target.files[0]).then((e:any)=>{
      this.valorBooleanOCul = false
      this.valorBooleanOMost = true
      this.urlPdfFile = e.base
    })
  }

  //firmar el documento
  firmarPDF(){
    const  datosFull = {
      user: this._id,
      message: this.urlPdfFile,
      nombre: this.datosUser.nombre
    }

    this.firmarService.FirmarDocumento(datosFull)
      .subscribe((e)=>{
        this.urlPdfFileFirmado = e.body.pdf
        this.irSiguiente = true
      })
  }

  CerrarPanFirmado(){
    this.irSiguiente = false
    this.valorBooleanOCul = true,
    this.valorBooleanOMost = false
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
