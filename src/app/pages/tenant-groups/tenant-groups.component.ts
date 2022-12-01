import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tenant-groups',
  templateUrl: './tenant-groups.component.html',
  styleUrls: ['./tenant-groups.component.css']
})
export class TenantGroupsComponent implements OnInit {
  data: any;
  adding: any;

  format: any = {                    
      title: "Tenant Group List",                                                       
      sql: "select ID, TENANT_GROUP, GROUP_NAME, SUBQUERY FROM FPS_TENANT_GROUP ORDER BY TENANT_GROUP",
      search: "Y",                                                                     
      pagination: "Y",
      class: "table table-responsive table-striped table-bordered border-primary",      
      style: "",                                                          
      columns: [                      
        { type: "data", class: "p-2", style: "", title: "Tenant Group", value: "TENANT_GROUP" },
        { type: "data", class: "p-2", style: "", title: "Group Name", value: "GROUP_NAME" },
        { type: "data", class: "p-2", style: "", title: "Subquery", value: "SUBQUERY" },
        { type: "button", class: "btn btn-primary",  style: "", title: "Edit",  value: "" }
      ],
      buttons: [ { class: "btn btn-primary", title: "Add Tenant Group",  value: "Y" }]
    };

  constructor(
     private _activatedRoute: ActivatedRoute,
     private _router: Router
     ) { }

     ngOnInit(): void {
      this._activatedRoute.data.subscribe(({ data }) => {
          this.data=data;
      }
      )
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

    showAdding() {
      if (this.adding=='Y') {
        this.adding='N';
      } else {
        this.adding='Y';
      }
    }

  }
  