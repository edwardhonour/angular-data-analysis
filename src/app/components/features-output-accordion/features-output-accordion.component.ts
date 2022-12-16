import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '.app-features-output-accordion',
  templateUrl: './features-output-accordion.component.html',
  styleUrls: ['./features-output-accordion.component.css']
})
export class FeaturesOutputAccordionComponent implements OnInit {

  @Input() data: any;
  loading: string='';
  url: any;
  page: string = 'today.asp';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  pressButton(a: any) {
    this.data.formData.CAT_ID=a;
    this.dataService.postForm("get-feature-criteria-category", this.data.formData).subscribe((data:any)=>{
        this.data=data;
        this.getData.emit(this.data);
    });
}
  @Output() 
  buttonPressed: EventEmitter<string> = new EventEmitter<string>();

  @Output() 
  getData: EventEmitter<any> = new EventEmitter<any>();

}
