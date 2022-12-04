import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-criteria-panel',
  templateUrl: './criteria-panel.component.html',
  styleUrls: ['./criteria-panel.component.css']
})
export class CriteriaPanelComponent implements OnInit, OnChanges {
  constructor(private _dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      term: any;             // Search Filter
      list: any;

      ngOnInit(): void {

      }


    buttonClick(m: any) {
      // 
      // Select a critera option from the list.
      //
          this.data.optionData.OPTIONID = m.OPTIONID
          this.data.optionData.CAT_ID=m.OPTION_ID;
          this._dataService.postForm("select-criteria-option", this.data.optionData).subscribe((data:any)=>{
          this.data=data;
          this.getData.emit(this.data);
      });
    } 

    ngOnChanges() {
        this.list=this.data;
        console.log(this.list);
    }

    @Output()
    getData: EventEmitter<any> = new EventEmitter<any>(); 

}
