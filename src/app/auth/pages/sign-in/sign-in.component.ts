import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre : ['', [Validators.required, Validators.minLength(3)] ],
    correo: ['', [ Validators.required,Validators.email] ],
    contraseña: ['', [ Validators.required, Validators.minLength(8)] ],
    confirContra: ['', [ Validators.required, Validators.minLength(8)] ]
  })

  constructor(private fb: FormBuilder ) { }
  ngOnInit(): void {
  }

  checkiarContra(): ValidationErrors | false | null{
    if(!this.miFormulario.controls){
      return null
    }
    if (this.miFormulario.get('contraseña')?.value == this.miFormulario.get('confirContra')?.value ) {
      return {notSame: true}
    }
    return false
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardarDatos(){
    if (!this.miFormulario.valid) {
      this.miFormulario.markAllAsTouched();
    }
    console.log(this.miFormulario.controls);
  }

}
