import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: '.app-local-top-navbar',
  templateUrl: './local-top-navbar.component.html',
  styleUrls: ['./local-top-navbar.component.css']
})
export class LocalTopNavbarComponent implements OnInit, OnChanges {


  constructor() { }
  
  @Input() id: any;
  @Input() data: any;
  url: any;

  ngOnChanges() {
  
  }

  ngOnInit(): void {

  }

  doExcel() {
    this.url = new URL(window.location.href);
    const baseUrl = this.url.origin;
    window.open(
      baseUrl + "/data-analysis/assets/data/xlsx.php?id=" + this.data.rnum);
  }

  @Output() 
  getData: EventEmitter<any> = new EventEmitter<any>();

  doClick(m: any) {
    this.getData.emit(m);
  }

}
