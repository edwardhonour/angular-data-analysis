import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  data: any;
  d: any;
  adding: any;
  path: any;
  title = 'angular-mist-template';

  constructor(
    private dataService: DataService
    ) { }

  ngOnChanges() {
      
  }

  ngOnInit() {

    let d: any = [];
    this.dataService.postForm("xxx", d).subscribe((data:any)=>{
         this.data=data;
         console.log(this.data)
    });

  }

  doLeaving(m: any) {

  }

}
