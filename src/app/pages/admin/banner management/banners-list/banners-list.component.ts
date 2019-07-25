import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.scss']
})
export class BannersListComponent implements OnInit {

  display: boolean = false;
  banersdata: any[];
  @Output() displayChange = new EventEmitter();
    cols: any[];

    constructor() {
      this.cols = [
        { field: 'Country', header: 'Country' },
        {field: 'Image', header: 'Image' },
        { field: 'Language', header: 'Language' },
        { field: 'StartDate', header: 'StartDate' },
        { field: 'EndDate', header: 'EndDate' }
    ];
      this.banersdata=[
        {'Country':"India","Image":"","Language":"ENGLISH","StartDate":"2019-07-15 14:55:10","EndDate":"2019-07-15 14:55:10"},
        {'Country':"USA","Image":"","Language":"abc","StartDate":"2019-07-15 14:55:10","EndDate":"2019-07-15 14:55:10"},
        {'Country':"AUSTRALIA","Image":"","Language":"abc","StartDate":"2019-07-15 14:55:10","EndDate":"2019-07-15 14:55:10"},
        {'Country':"ENGLAND","Image":"","Language":"abc","StartDate":"2019-07-15 14:55:10","EndDate":"2019-07-15 14:55:10"}
      ]
     }

    ngOnInit() {
       

      
    }
    Addbanners() {
      this.display = true;
  }
  onDialogClose(event) {
     this.display = event;
  }
 

}
