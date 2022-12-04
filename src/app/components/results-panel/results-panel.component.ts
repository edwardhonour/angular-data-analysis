import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.css']
})
export class ResultsPanelComponent implements OnInit, OnChanges {
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
        if (this.format.sql!=='') {
            this.dataService.getDataSQL(this.format.sql).subscribe( (data: any) => {
                this.list=data.list;
                console.log('this');
                console.log(this.list);
                console.log('here');
            });
       
        }
    }

    @Output()
    buttonClicked: EventEmitter<string> = new EventEmitter<string>(); 

  @Output()
  editClicked: EventEmitter<string> = new EventEmitter<any>(); 

  /* USAGE

  <app-list-component [data]="data" [format]="format" (buttonClicked)="buttonClicked($event)" (editClicked)="editClicked($event)"
  
  1: [data] sends the parent "data" variable into local [data].
  2: [format] sends the parent "format" variable into local [format].
  3: (buttonClicked) listens for the buttonClicked @Output and passes $event into parent buttonClicked function.
  4: (editClicked) listens for the editClicked @Output and passes $event into parent editClicked function.
  
  Parent Component must have data:any populated from resolver.
  Parent Component must have format:any defining the format.

    format: any = {                    
    title: "Data Source List",                                                       // Title above the list.
    sql: "SELECT ID FROM TABLE",
    search: "Y",                                                                     // Include search filter.
    class: "table table-responsive table-striped table-bordered border-primary",     // Classes of the table. 
    style: "",                                                                       // Style of the outer component.
    columns: [                      // Array of columns.
      {
        type: "data",               // data, text, button
        class: "p-2",               // classes applied to the column.
        style: "",                  // styles applied to the column.
        title: "TAG",               // Header title of the column.
        value: "TAG",               // if DATA: m.VALUE.
      },
      {
        type: "text",
        class: "p-2",
        style: "",
        title: "",
        value: "Label:",            // if TEXT: hardcoded value.
      },
      {
        type: "button",
        class: "btn btn-primary",  // class of the button.
        style: "",
        title: "Edit",
        value: "",                  // the m record is always returned.
      }
    ],
    buttons: [                                                                      // Array of buttons at the top.
      {
        class: "btn btn-primary",          // Classes applied to the button.
        title: "Add Data Source",          // Label on the button.
        value: "Y"                         // Value returned to the parent component.
      }]
    };

  */

}


