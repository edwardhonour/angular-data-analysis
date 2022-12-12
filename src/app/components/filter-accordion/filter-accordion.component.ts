import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-filter-accordion',
  templateUrl: './filter-accordion.component.html',
  styleUrls: ['./filter-accordion.component.css']
})
export class FilterAccordionComponent implements OnInit {

  @Input() data: any;
  loading: string='';
  url: any;
  page: string = 'today.asp';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }



  pressButton(m: any) {
    // 
    // Select a critera option from the list.
    //
        this.data.optionData.WEIGHT_ID=m;
        this.dataService.postForm("get-filter-option", this.data.optionData).subscribe((data:any)=>{
        this.data=data;
        this.getData.emit(this.data);
    });
  } 

  @Output() 
  getData: EventEmitter<any> = new EventEmitter<any>();

}