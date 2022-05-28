import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errordatos: any = ''
  datosFull: any;
  miFormulario: FormGroup = this.fb.group({
    correo: ['', [ Validators.required,Validators.email] ],
    contraseña: ['', [ Validators.required, Validators.minLength(8)] ],
  })

  constructor(  private fb: FormBuilder,
                private AuthService: AuthService,
                private router: Router) { }

  ngOnInit(): void {
  }

  guardarDatos(){
    this.datosFull = {
      correo:  this.miFormulario.controls['correo'].value,
      password:  this.miFormulario.controls['contraseña'].value,
    }

    if (this.datosFull.correo == '') {
      this.errordatos = 'ingreso los datos'
    }else{
      this.errordatos = 'cargando'
      this.AuthService.verificarUser(this.datosFull.correo, this.datosFull.password)
      .subscribe((e)=>{
        if(e.body[0].password == this.miFormulario.controls['contraseña'].value){
          this.errordatos = ''
          this.router.navigate([`/firmar`, {id:e.body[0]._id }])
        }else{
          this.errordatos = 'Datos son incorrectos';
        }
      })

    }

  }
}
