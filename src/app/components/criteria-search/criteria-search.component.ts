import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-criteria-search',
  templateUrl: './criteria-search.component.html',
  styleUrls: ['./criteria-search.component.css']
})
export class CriteriaSearchComponent implements OnInit, OnChanges {
  constructor(private _dataService: DataService) { }
  
      @Input() format: any;  // JSON Array laying out the structure of the component.
      @Input() data: any;    // DATA Array from parent component.
      p: any;                // Pagination Page
      search: any;             // Search Filter
      list: any;

      ngOnInit(): void {

      }

    buttonClick(n: string) {
       // One of the top buttons is click. The 'value' field is 
      // returned to the parent component.
      this.buttonClicked.emit(n);
    }

    editClick(m: any) {
      // An edit button in the list was clicked. The record (m) is
      // returned to the parent component.
      this.editClicked.emit(m);
    }

    ngOnChanges() {
        this.list=this.data;
    }

    performSearch() {
        this.data.searchData.SEARCH = this.search;
        this._dataService.postForm("perform-criteria-search", this.data.searchData).subscribe((data:any)=>{
            this.data=data;
            this.searchData.emit(this.data);
        });
    }

    @Output()
    buttonClicked: EventEmitter<string> = new EventEmitter<string>(); 

    @Output()
    editClicked: EventEmitter<any> = new EventEmitter<any>(); 

    @Output()
    searchData: EventEmitter<any> = new EventEmitter<any>(); 

}


