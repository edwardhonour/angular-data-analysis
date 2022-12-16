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
  panel_id: string='1';

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
    console.log(this.data);
  }

  getAllData(d: any) {
    this.data = d;
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

    changePage(m:any){
      this.page_id=m;
      this.data.options=[];
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


  doCriteriaSearch(m:any) {

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

getData(d: any) {
  let tmpOptions: any;
  let tmpList: any;
  console.log('ready to catch');
  tmpOptions=this.data.options;
  this.data = d;
  this.data.options=tmpOptions;
  console.log('catched');
  console.log(this.data)
} 
  
getFeaturesData(d: any) {
  let tmpOptions: any;
  let tmpList: any;
  tmpOptions=this.data.options;
  this.data = d;
  console.log('getFeaturesData catched');
  console.log(this.data)
  this.data.section_title="Select Features";
  this.panel_id='2';
} 

getColumnsData(d: any) {
  let tmpOptions: any;
  let tmpList: any;
  console.log('getColumnsData');
  tmpOptions=this.data.options;
  this.data = d;
  this.data.section_title="Select Columns";
  console.log('catched');
  console.log(this.data)
  this.panel_id='1';
} 

    getCriteriaSearch(i: any) {
      this.data.formData.CAT_ID=i;
      this._dataService.postForm("get-criteria-search", this.data.formData).subscribe((data:any)=>{
      this.data=data;
    });
}

  }
  