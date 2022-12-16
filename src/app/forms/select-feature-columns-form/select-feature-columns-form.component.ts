import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '.app-select-feature-columns-form',
  templateUrl: './select-feature-columns-form.component.html',
  styleUrls: ['./select-feature-columns-form.component.css']
})
export class SelectFeatureColumnsFormComponent implements OnInit, OnChanges {
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
          this.data.optionData.OPTIONID = m.OPTIONID
          this.data.optionData.CAT_ID=m.OPTION_ID;
          this.tmpList=this.data.options2;
          this._dataService.postForm("select-criteria-feature-option", this.data.optionData).subscribe((data:any)=>{
              this.data=data;
              this.data.options2=this.tmpList;
              this.getData.emit(this.data);
          });
    } 

    ngOnChanges() {
      console.log('select-feature-columns-form.component.ts: ngOnChanges()');
        this.list=this.data;
        console.log(this.list);
    }

    @Output()
    getData: EventEmitter<any> = new EventEmitter<any>(); 

}
