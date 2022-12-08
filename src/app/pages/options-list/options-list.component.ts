import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent implements OnInit, OnChanges {

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
        type: "data",               
        class: "p-2",              
        style: "",                 
        title: "Category",  
        value: "WEIGHT_ID",
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "Option ID",              
        value: "OPTIONID",              
      },
      {
        type: "data",              
        class: "p-2",              
        style: "",                  
        title: "Description",              
        value: "OPTION_DSC",              
      },
      {
        type: "data",              
        class: "p-2",             
        style: "",                 
        title: "Option Type",              
        value: "OPTION_TYPE",            
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "Source",              
        value: "OPTION_SOURCE",             
      },
      {
        type: "data",              
        class: "p-2",               
        style: "",                 
        title: "Level",              
        value: "DISPLAY_LEVEL",             
      },
      {
        type: "button",
        class: "btn btn-dark",  // class of the button.
        style: "",
        title: "Edit",
        value: "",                  // the m record is always returned.
      }
    ],
    buttons: [                                                                      // Array of buttons at the top.
      {
        class: "btn btn-primary",          // Classes applied to the button.
        title: "Add Option",          // Label on the button.
        value: "Y"                         // Value returned to the parent component.
      }]
    };

  data: any;
  adding: any;
  page_id: string='6';

  constructor(
     private _activatedRoute: ActivatedRoute,
     private _router: Router,
     private _dataService: DataService
     ) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ data }) => {
        this.data=data;
    }
    )
  }

  ngOnChanges() {

  }

  buttonClicked(m: any) {
    this.data.formData['ID']="";
    this.data.formData['OPTIONID']="";
    this.data.formData['WEIGHT_ID']="";
    this.data.formData['SHORT_NAME']="";
    this.data.formData['DISPLAY_LEVEL']="";
    this.data.formData['OPTION_SOURCE']="";
    this.data.formData['OPTION_DSC']="";
    this.data.formData['OPTION_ORDER']="";
    this.data.formData['OPTION_TYPE']="";
    this.data.formData['TITLE']="";
    this.adding='Y';
  }

  editClicked(m: any) {
      this.data.formData['ID']=m.ID;
      this.data.formData['WEIGHT_ID']=m.WEIGHT_ID;
      this.data.formData['OPTIONID']=m.OPTIONID;
      this.data.formData['DISPLAY_LEVEL']=m.DISPLAY_LEVEL;
      this.data.formData['OPTION_SOURCE']=m.OPTION_SOURCE;
      this.data.formData['SHORT_NAME']=m.SHORT_NAME;
      this.data.formData['OPTION_DSC']=m.OPTION_DSC;
      this.data.formData['OPTION_ORDER']=m.OPTION_ORDER;
      this.data.formData['OPTION_TYPE']=m.OPTION_TYPE;
      this.data.formData['TITLE']=m.TITLE;
      this.adding='Y';
  }

  formClose(m: any) {
      this.adding='N';
  }

    formComplete(m: any) {
      location.reload();
    }

  }
  