import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-count-panel',
  templateUrl: './count-panel.component.html',
  styleUrls: ['./count-panel.component.css']
})
export class CountPanelComponent implements OnInit, OnChanges {
  constructor(private dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      term: any;             // Search Filter
      list: any;

      ngOnInit(): void {

      }

    buttonClick(n: string) {
       // One of the top buttons is click. The 'value' field is 
      // returned to the parent component.
      this.buttonClicked.emit(n);
    }

    editClick(m: any) {
      // An edit button in the list was clicked. The record (m) is
      // returned to the parent component.
      this.editClicked.emit(m);
    }

    ngOnChanges() {
        this.list=this.data;
    }

    @Output()
    buttonClicked: EventEmitter<string> = new EventEmitter<string>(); 

    @Output()
    editClicked: EventEmitter<string> = new EventEmitter<any>(); 

}


