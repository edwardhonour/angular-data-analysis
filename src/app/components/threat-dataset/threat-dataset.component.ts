import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '.app-threat-dataset',
  templateUrl: './threat-dataset.component.html',
  styleUrls: ['./threat-dataset.component.css']
})
export class ThreatDatasetComponent implements OnInit {

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