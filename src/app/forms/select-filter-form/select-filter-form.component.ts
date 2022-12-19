import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '.app-select-filter-form',
  templateUrl: './select-filter-form.component.html',
  styleUrls: ['./select-filter-form.component.css']
})
export class SelectFilterFormComponent implements OnInit, OnChanges {
  constructor(private dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      term: any;             // Search Filter
      list: any;
      tmpList: any;
      title: any;

      ngOnInit(): void {

      }

      include(m: any) {
            this.data.optionData.OPTIONID = m.OPTIONID
            this.data.optionData.WEIGHT_ID=m.WEIGHT_ID;
            this.data.optionData.OPTION_EXCLUDE="INCLUDE";
            this.data.optionData.OPTION_VALUE=m.SHORT_NAME;
            this.data.optionData.OPTION_SOURCE='SET';
            this.data.optionData.OPTION_TYPE=m.WEIGHT_ID;
            this.tmpList=this.list;
            this.dataService.postForm("include-filter-option", this.data.optionData).subscribe((data:any)=>{
                this.data=data;
                this.data.options=this.tmpList;
                this.getData.emit(this.data);
            });
      } 

      exclude(m: any) {
        this.data.optionData.OPTIONID = m.OPTIONID
        this.data.optionData.WEIGHT_ID=m.WEIGHT_ID;
        this.data.optionData.OPTION_EXCLUDE="EXCLUDE";
        this.data.optionData.OPTION_VALUE=m.SHORT_NAME;
        this.data.optionData.OPTION_SOURCE='SET';
        this.data.optionData.OPTION_TYPE=m.WEIGHT_ID;
        this.tmpList=this.list;
        this.dataService.postForm("exclude-filter-option", this.data.optionData).subscribe((data:any)=>{
            this.data=data;
            this.data.options=this.tmpList;
            this.getData.emit(this.data);
        });
  } 


    ngOnChanges() {
        console.log('Facility Option Changed')
        this.list=this.data.options;
    }

    @Output()
    getData: EventEmitter<string> = new EventEmitter<any>(); 
}

