import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-report-output',
  templateUrl: './report-output.component.html',
  styleUrls: ['./report-output.component.css']
})
export class ReportOutputComponent implements OnInit, OnChanges {
  data: any;
  adding: any;
  page_id: string='4';

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
          this.data.optionData.OPTIONID = m.OPTIONID
          this.data.optionData.CAT_ID=m.OPTION_ID;
          this._dataService.postForm("post-criteria-category", this.data.optionData).subscribe((data:any)=>{
          this.data=data;
      });
    }

   deleteCriteria(m: any) {
    this.data.optionData.OPTIONID = m.OPTION_ID
    this.data.optionData.CAT_ID=m.OPTION_ID;
    this._dataService.postForm("delete-criteria-category", this.data.optionData).subscribe((data:any)=>{
    this.data=data;
});
}

    getCriteriaCategory(i: any) {
          this.data.formData.CAT_ID=i;
          this._dataService.postForm("get-criteria-category", this.data.formData).subscribe((data:any)=>{
          this.data=data;
      });
    }

  }
  