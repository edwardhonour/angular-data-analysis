import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-accordion',
  templateUrl: './filter-accordion.component.html',
  styleUrls: ['./filter-accordion.component.css']
})
export class FilterAccordionComponent implements OnInit {

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