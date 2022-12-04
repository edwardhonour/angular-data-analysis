import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-local-top-navbar',
  templateUrl: './local-top-navbar.component.html',
  styleUrls: ['./local-top-navbar.component.css']
})
export class LocalTopNavbarComponent implements OnInit {

  constructor() { }
  
  @Input() id: any;

  ngOnInit(): void {

  }

}
