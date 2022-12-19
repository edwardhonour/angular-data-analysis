import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { RouteGuard } from './route.guard';


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
  displayLoadingIndicator: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, 
    privateAuthService: RouteGuard, 
    private dataService: DataService, 
    private router: Router) { }

  ngOnChanges() {
      
  }

  ngOnInit() {

    let d: any = [];
    this.dataService.postForm("xxx", d).subscribe((data:any)=>{
         this.data=data;
         console.log(this.data)
    });
    this.activatedRoute.fragment.subscribe((value: any) => {
      console.log(value);
      this.jumpTo(value);
    });

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.displayLoadingIndicator = true;
      } else if (routerEvent instanceof NavigationEnd) {
        this.displayLoadingIndicator = false;
      } else if (routerEvent instanceof NavigationCancel) {
        this.displayLoadingIndicator = false;
      }
    });

  }

  jumpTo(section: any) {
//    document.getElementById(section.scrollIntoView({ behavior: 'smooth' }));
  }

  doLeaving(m: any) {

  }

}
