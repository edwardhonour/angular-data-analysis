import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save-search',
  templateUrl: './save-search.component.html',
  styleUrls: ['./save-search.component.css']
})
export class SaveSearchComponent implements OnInit {

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