import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: '.app-bootstrap-accordion',
  templateUrl: './bootstrap-accordion.component.html',
  styleUrls: ['./bootstrap-accordion.component.css']
})
export class BootstrapAccordionComponent implements OnInit, OnChanges {

  @Input() user: any;
  @Input() data: any;
  @Input() accordion: any;
  loading: string='';
  url: any;
  page: string = 'today.asp';
  constructor() { }

  ngOnChange() {
    console.log("ngChanges");
  }

  ngOnChanges() { 
      console.log("bootstrap accordion ngChanges")
      console.log(this.accordion);
  }

  ngOnInit(): void {

  }

  pressButton(a: any) {
      this.buttonPressed.emit(a);
  }

  @Output() 
  buttonPressed: EventEmitter<string> = new EventEmitter<string>();

}
