import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnChanges {
  data: any;
  adding: any;
  page_id: string='1';

  constructor(
     private _activatedRoute: ActivatedRoute,
     private _router: Router,
     private _dataService: DataService
     ) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ data }) => {
        this.data=data;
        if (this.data.rnum!==undefined) {
          localStorage.setItem('rnum',this.data.rnum);
        }
    }
    )
  }

  ngOnChanges() {

  }

    doLeaving(a: any) {
      console.log("I am leaving ");
    }

    editClicked(m: any) {
      this._router.navigate(['/edit-tenant-group',m.ID]);
    }

    buttonClicked(m: any) {
      this._router.navigate(['/edit-tenant-group',0]);
    }

    selectCriteria(m: any) {
      // 
      // Select a critera option from the list.
      //
          this.data.optionData.OPTIONID = m.OPTIONID
          this.data.optionData.CAT_ID=m.OPTION_ID;
          this._dataService.postForm("select-criteria-option", this.data.optionData).subscribe((data:any)=>{
          this.data=data;
      });
    }

  selectOperator(m: any) {
      //
      // Select an Operator (/)/AND/OR/NOT AND
      //
      this.data.optionData.OPTIONID = m
      this.data.optionData.CAT_ID=m;
      this.data.optionData.WEIGHT_ID=
      this._dataService.postForm("select-criteria-option", this.data.optionData).subscribe((data:any)=>{
      this.data=data;
  });
}

   deleteCriteria(m: any) {
    //
    // Remove a selection criteria from the list.
    //
    this.data.optionData.OPTIONID = m.OPTION_ID
    this.data.optionData.OPTION_VALUE=m.ID;
    this._dataService.postForm("delete-criteria-option", this.data.optionData).subscribe((data:any)=>{
    this.data=data;
  });
  }

  deleteFilter(m: any) {
    //
    // Remove a selection filter from the list.
    //
    this.data.optionData.OPTIONID = m.OPTION_ID
    this.data.optionData.CAT_ID=m.ID;
    this._dataService.postForm("delete-criteria-filter", this.data.optionData).subscribe((data:any)=>{
    this.data=data;
  });
  }

  doCriteriaSearch(m:any) {
    
  }
  deleteColumn(m: any) {
    //
    // Remove a report column from the list.
    //
    this.data.optionData.OPTIONID = m.OPTION_ID
    this.data.optionData.CAT_ID=m.OPTION_ID;
    this._dataService.postForm("delete-criteria-column", this.data.optionData).subscribe((data:any)=>{
    this.data=data;
  });
  }

  getResultCount() {
    //
    // Count the number of records returned.
    //
    this._dataService.postForm("count-results", this.data.optionData).subscribe((data:any)=>{
    this.data=data;
  });
  }

  startNewReport() {
    this.data.optionData.OPTIONID = '0';
    this.data.optionData.CAT_ID='0';
    this._dataService.postForm("start-new-report", this.data.optionData).subscribe((data:any)=>{
    this.data=data;
  });
  }

    getCriteriaCategory(i: any) {
          this.data.formData.CAT_ID=i;
          this._dataService.postForm("get-criteria-category", this.data.formData).subscribe((data:any)=>{
          this.data=data;
      });
    }

    getCriteriaSearch(i: any) {
      this.data.formData.CAT_ID=i;
      this._dataService.postForm("get-criteria-search", this.data.formData).subscribe((data:any)=>{
      this.data=data;
    });
}

  }
  