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
  page: string = 'today.asp';
  constructor() { }

  ngOnInit(): void {

  }

  leavePage() {
      this.leavingPage.emit('GOING');
  }

  @Output() 
  leavingPage: EventEmitter<string> = new EventEmitter<string>();

  doMIST() {
    this.url = new URL(window.location.href);
    const baseUrl = this.url.origin;
    location.href = baseUrl + '/' + this.page;
  }
  
  gotoMIST(p: any) {
    this.loading='Y';
    this.url = new URL(window.location.href);
    const baseUrl = this.url.origin;
    location.href = baseUrl + '/' + p;
    //this.leavingPage.emit('Y');
    //setTimeout(this.doMIST, 500); 
  }

}
