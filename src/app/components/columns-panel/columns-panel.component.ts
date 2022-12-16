import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '.app-columns-panel',
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
      tmpOptions: any;
      tmpOptions2: any;

      ngOnInit(): void {

      }

    deleteColumn(m: any) {
      //
      // Remove a report column from the list.
      //
      this.data.optionData.OPTIONID=m.OPTION_ID;
      this.data.optionData.CAT_ID=m.ID;
      this.tmpOptions=this.data.options;
      this.tmpOptions2=this.data.options2;
      this._dataService.postForm("delete-criteria-column", this.data.optionData).subscribe((data:any)=>{
      this.data=data;
      this.data.options=this.tmpOptions;
      this.data.options2=this.tmpOptions2;
      this.getData.emit(this.data);
    });
    }

    ngOnChanges() {
        console.log('passed to panel')
    //    this.list=this.data.options;
    }

    @Output()
    buttonClicked: EventEmitter<string> = new EventEmitter<string>(); 

    @Output()
    getData: EventEmitter<any> = new EventEmitter<any>(); 

}


