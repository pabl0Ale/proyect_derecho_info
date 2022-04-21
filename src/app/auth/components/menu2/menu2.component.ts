import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css']
})
export class Menu2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  principal(){
    this.router.navigate(['./auth/principal'])
  }

  crear_Cuenta(){
    this.router.navigate(['./auth/registro'])
  }
}
