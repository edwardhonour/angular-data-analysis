import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  data: any;

  constructor(
     private _activatedRoute: ActivatedRoute,
     private _router: Router
     ) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ data }) => {
        this.data=data;
        console.log(this.data);
    }
    )
  }

  doLeaving(a: any) {
    console.log("I am leaving ");
  }

}
