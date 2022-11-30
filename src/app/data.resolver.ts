import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<boolean> {

  r: any;
  path: any;

  constructor(private dataService: DataService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    this.path='';

    if (state.url!==undefined) {
      this.path=state.url;
    }

    this.r=this.dataService.getData(this.path).pipe(catchError(err=>
      { 
        console.log(err);
        return of(null);
      }
      ));
      return(this.r);
  }
}
