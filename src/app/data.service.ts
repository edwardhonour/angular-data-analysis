import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  production: any; 
  localPath: any;
  remotePath: any;
  path: any; 
  url: any;
  t: any;
  uid: any;

  constructor(private http: HttpClient) { 

    this.production = 'N';
    this.localPath = "assets/data/index.php"
    this.remotePath = "https://myna-api.com/api/active-shooter.php"
  
    if (this.production=='N') {
      this.url = this.remotePath;
    } else {
      this.url = this.localPath;
    }
  }

  getLocalStorage() {
    if (localStorage.getItem('uid')===null) {
      this.uid = 0;
    } else {
      this.uid = localStorage.getItem('uid');
    }
  }

  getData(path: any) {
    const data = {
       "q": path,           
       "uid": this.uid,
       "sql": ""
    }
    this.getLocalStorage();
    this.t = this.http.post(this.url, data);
    return this.t; 
  }
 
  getDataSQL(sql: any) {
    const data = {
       "q": 'sql',           
       "uid": this.uid,
       "sql": sql
    }
    this.getLocalStorage();
    this.t = this.http.post(this.url, data);
    console.log(this.t);
    return this.t; 
  }

  postForm(formID: any, formData: any[]) {
      this.getLocalStorage();
      const data = {
        "q": formID, 
        "data": formData,
        "uid": this.uid
      }
      this.t=this.http.post(this.url,data);
      return this.t;
  }

}
