import { Component, OnInit, HostListener, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-options',
  templateUrl: './edit-options.component.html',
  styleUrls: ['./edit-options.component.css']
})
export class EditOptionsComponent implements OnInit, OnChanges {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _formBuilder: UntypedFormBuilder
) { }

  @Input() formData: any;

  ngOnInit(): void {
  }

  // This is required when parent data is used in the form and
  // changes.
  
  ngOnChanges() { }

  postForm() {
    this._dataService.postForm("post-edit-da-option", this.formData).subscribe((data:any)=>{
      if (data.error_code=="0") {
        this.formComplete.emit('X');
      } else {     
//       this.error=data.error_message
      }
    });
  }

  hideForm() {
    this.formClose.emit('N');
  }

  @Output()
  formClose: EventEmitter<string> = new EventEmitter<string>(); 

  @Output()
  formComplete: EventEmitter<string> = new EventEmitter<string>(); 

}
