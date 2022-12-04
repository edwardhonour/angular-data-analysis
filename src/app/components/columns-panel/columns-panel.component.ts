import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-columns-panel',
  templateUrl: './columns-panel.component.html',
  styleUrls: ['./columns-panel.component.css']
})
export class ColumnsPanelComponent implements OnInit, OnChanges {
  constructor(private _dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      term: any;             // Search Filter
      list: any;

      ngOnInit(): void {

      }

    deleteColumn(m: any) {
      //
      // Remove a report column from the list.
      //
      this.data.optionData.OPTIONID = m.OPTION_ID
      this.data.optionData.CAT_ID=m.OPTION_ID;
      this._dataService.postForm("delete-criteria-column", this.data.optionData).subscribe((data:any)=>{
      this.data=data;
    });
    }

    ngOnChanges() {
        this.list=this.data;
    }

    @Output()
    buttonClicked: EventEmitter<string> = new EventEmitter<string>(); 

    @Output()
    editClicked: EventEmitter<string> = new EventEmitter<any>(); 

}


