import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-accordion',
  templateUrl: './test-accordion.component.html',
  styleUrls: ['./test-accordion.component.css']
})
export class TestAccordionComponent implements OnInit {

  @Input() user: any;
  @Input() data: any;

  accordion: any = {                    
    sections: [                      
      {
        title: "Facility",    
        id: "One",           
        items: [
            { 
              title: "Facility",
              button: "21",
            },
            { 
              title: "Region",
              button: "22",
            },            
            { 
              title: "City",
              button: "23",
            },
        ]
      },
      {
        title: "FSA",               
        id: "Two",
        items: [
            { 
              title: "District",
              button: "21",
            },
            { 
              title: "Inspector",
              button: "22",
            },            
            { 
              title: "Area Commander",
              button: "23",
            },
        ]
      },
    ]
    };

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