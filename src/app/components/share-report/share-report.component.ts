import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: '.app-share-report',
  templateUrl: './share-report.component.html',
  styleUrls: ['./share-report.component.css']
})
export class ShareReportComponent implements OnInit {

  @Input() user: any;
  loading: string='';
  url: any;
  page: string = 'today.asp';
  constructor() { }

  ngOnInit(): void {

  }

  pressButton(a: any) {
      this.buttonPressed.emit(a);
  }

  @Output() 
  buttonPressed: EventEmitter<string> = new EventEmitter<string>();

}