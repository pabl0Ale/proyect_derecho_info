import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() datosUser: any
  constructor(  private router: Router) { }

  ngOnInit(): void {
  }

  cerrar_Sesion(){
    this.router.navigate(['./auth/principal'])
  }

}
