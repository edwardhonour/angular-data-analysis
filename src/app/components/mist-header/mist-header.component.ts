import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mist-header',
  templateUrl: './mist-header.component.html',
  styleUrls: ['./mist-header.component.css']
})
export class MistHeaderComponent implements OnInit {

  @Input() user: any;
  loading: string='';
  url: any;
  constructor() { }

  ngOnInit(): void {

  }

  leavePage() {
      this.leavingPage.emit('GOING');
  }

  @Output() 
  leavingPage: EventEmitter<string> = new EventEmitter<string>();

  doMIST(page: any) {
    this.url = new URL(window.location.href);
    const baseUrl = this.url.origin;
    location.href = baseUrl + '/' + page;
  }
  
  gotoMIST(page: any) {
    this.loading='Y';
    this.leavingPage.emit('Y');
    setTimeout(this.doMIST, 500); 
  }

}
