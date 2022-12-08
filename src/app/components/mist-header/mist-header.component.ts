import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-mist-header',
  templateUrl: './mist-header.component.html',
  styleUrls: ['./mist-header.component.css']
})
export class MistHeaderComponent implements OnInit {

  @Input() user: any;
  loading: string='';
  username: string='';
  role: string='';
  url: any;
  page: string = 'today.asp';
  constructor() { }

  ngOnInit(): void {

  }

  leavePage() {
      this.leavingPage.emit('GOING');
  }

  ngOnChanges() {
    console.log('ngOnChanges')
    console.log(this.user);
    if (this.user!==undefined) {
      this.username = this.user.user.USER_NAME;
      this.role = this.user.user.ROLE;
    }

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
