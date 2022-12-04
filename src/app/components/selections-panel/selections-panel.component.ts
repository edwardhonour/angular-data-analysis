import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-selections-panel',
  templateUrl: './selections-panel.component.html',
  styleUrls: ['./selections-panel.component.css']
})
export class SelectionsPanelComponent implements OnInit , OnChanges {
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
          this.data.optionData.CAT_ID=m.ID;
          this._dataService.postForm("delete-criteria-option", this.data.optionData).subscribe((data:any)=>{
          this.data=data;
          this.getData.emit(this.data);
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
    getData: EventEmitter<any> = new EventEmitter<any>(); 

  @Output()
  editClicked: EventEmitter<string> = new EventEmitter<any>(); 


}


