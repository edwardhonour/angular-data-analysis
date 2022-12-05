import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-local-top-navbar',
  templateUrl: './local-top-navbar.component.html',
  styleUrls: ['./local-top-navbar.component.css']
})
export class LocalTopNavbarComponent implements OnInit {


  constructor() { }
  
  @Input() id: any;
  @Input() data: any;
  url: any;

  ngOnInit(): void {

  }

  doExcel() {
    this.url = new URL(window.location.href);
    const baseUrl = this.url.origin;
    window.open(
      baseUrl + "/data-analysis/assets/data/xlsx.php?id=" + this.data.rnum);
  }
}
