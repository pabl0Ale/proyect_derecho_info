import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  iniciar_secion(){
    this.router.navigate(['./auth/inciarSesion'])
  }

  principal(){
    this.router.navigate(['./auth/principal'])
  }
}
