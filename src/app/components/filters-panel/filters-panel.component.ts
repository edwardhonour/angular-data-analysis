import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '.app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.css']
})
export class FiltersPanelComponent implements OnInit, OnChanges {
  constructor(private _dataService: DataService) { }
  
      @Input() format: any;  
      @Input() data: any;  
      @Input() title: any;  
      p: any;               
      term: any;             
      list: any;

      ngOnInit(): void {

      }

    deleteFilter(m: any) {
      //
      // Remove a selection filter from the list.
      //
      this.data.optionData.OPTIONID = m.OPTION_ID
      this.data.optionData.ID=m.ID;
      this._dataService.postForm("delete-criteria-filter", this.data.optionData).subscribe((data:any)=>{
      this.data=data;
    });
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


