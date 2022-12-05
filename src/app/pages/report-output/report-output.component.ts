import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-report-output',
  templateUrl: './report-output.component.html',
  styleUrls: ['./report-output.component.css']
})
export class ReportOutputComponent implements OnInit, OnChanges {

  format: any = {                    
    title: "Ad-Hoc Report",                                                          
    sql: "",  
    search: "Y",                                                                    
    class: "table table-responsive table-striped table-bordered border-primary",    
    style: "",     
    pagination: "Y",     
    pagesize: 30,                                                            
    columns: [                      
      {
        type: "data",               // data, text, button
        class: "p-2",               // classes applied to the column.
        style: "",                  // styles applied to the column.
        title: "Building NBR",               // Header title of the column.
        value: "BUILDING_NBR",               // if DATA: m.VALUE.
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "Facility Name",              
        value: "FACILITY_NAME",              
      },
      {
        type: "data",              
        class: "p-2",              
        style: "",                  
        title: "Region",              
        value: "REGION_ID",              
      },
      {
        type: "data",              
        class: "p-2",             
        style: "",                 
        title: "District",              
        value: "DISTRICT_ID",            
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "City",              
        value: "CITY_NAME",             
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "State",              
        value: "STATE_ABBR",             
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "Ownership",              
        value: "OWNERSHIP_ID",              
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                
        title: "FSL",               
        value: "FSL",               
      },
      {
        type: "button",
        class: "btn btn-dark",  // class of the button.
        style: "",
        title: "View",
        value: "",                  // the m record is always returned.
      }
    ],
    buttons: []
    };


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
  