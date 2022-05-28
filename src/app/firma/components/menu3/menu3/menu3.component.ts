import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu3',
  templateUrl: './menu3.component.html',
  styleUrls: ['./menu3.component.css']
})
export class Menu3Component implements OnInit {
  id: any = 'sfsskjkl'
  @Input() datosUser: any
  constructor() { }
  ngOnInit(): void {
  }
}
