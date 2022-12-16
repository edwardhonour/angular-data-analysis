import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '.app-select-columns-form',
  templateUrl: './select-columns-form.component.html',
  styleUrls: ['./select-columns-form.component.css']
})
export class SelectColumnsFormComponent implements OnInit, OnChanges {
  constructor(private _dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      term: any;             // Search Filter
      list: any;
      tmpList: any;

      ngOnInit(): void {

      }


    buttonClick(m: any) {
      // 
      // Select a critera option from the list.
      //
          this.data.optionData.OPTIONID = m.OPTIONID;
          this.data.optionData.OPTION_TYPE='COLUMN';
          this.data.optionData.OPTION_SOURCE=m.OPTION_SOURCE;
          this.data.optionData.OPTION_VALUE=m.OPTION_DSC;
          this.tmpList=this.data.options;
          this._dataService.postForm("select-criteria-column", this.data.optionData).subscribe((data:any)=>{
          this.data=data;
          this.data.options=this.tmpList;
          this.getData.emit(this.data);
      });
    } 

    ngOnChanges() {
        this.list=this.data.options;
console.log('select-columns-form.component.ts: ngOnChanges()');
        console.log(this.list);
    }

    @Output()
    getData: EventEmitter<any> = new EventEmitter<any>(); 

}
