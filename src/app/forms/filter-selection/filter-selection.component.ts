import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.css']
})
export class FilterSelectionComponent implements OnInit, OnChanges {
  constructor(private dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      term: any;             // Search Filter
      list: any;
      title: any;

      ngOnInit(): void {

      }

      include(m: any) {
            this.data.optionData.OPTIONID = m.OPTIONID
            this.data.optionData.WEIGHT_ID=m.WEIGHT_ID;
            this.dataService.postForm("include-filter-option", this.data.optionData).subscribe((data:any)=>{
            this.data=data;
            this.getData.emit(this.data);
        });
      } 

      exclude(m: any) {
        this.data.optionData.OPTIONID = m.OPTIONID
        this.data.optionData.WEIGHT_ID=m.WEIGHT_ID;
        this.dataService.postForm("exclude-filter-option", this.data.optionData).subscribe((data:any)=>{
        this.data=data;
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

