import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  urlimagen: string = '';
  datosFull: any;
  miFormulario: FormGroup = this.fb.group({
    nombre : ['', [Validators.required, Validators.minLength(3)] ],
    correo: ['', [ Validators.required,Validators.email] ],
    contraseña: ['', [ Validators.required, Validators.minLength(8)] ],
  })

  constructor(  private fb: FormBuilder,
                private sanitizer: DomSanitizer,
                private AuthService: AuthService,
                private router: Router) {}
  ngOnInit(): void {
  }

  imagenmetho(e: any):any{
    const archivoObt = e.target.files[0]
    this.extraerBase64(archivoObt).then((e:any)=>{
      this.urlimagen = e.base
    })
  }

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

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardarDatos(){

    //comprueba si los datos estan llenos
    if (!this.miFormulario.valid) {
      this.miFormulario.markAllAsTouched();
      return
    }
    if ( !this.urlimagen ) {
      return
    }
    //hasta aqui

    this.datosFull = {
      nombre: this.miFormulario.controls['nombre'].value,
      correo:  this.miFormulario.controls['correo'].value,
      password:  this.miFormulario.controls['contraseña'].value,
      img: this.urlimagen
    }

    this.AuthService.agregarHereo(this.datosFull)
      .subscribe((e: any)=>{
        this.router.navigate([`/firmar`, {id:e.body._id }])
      })
  }
}
