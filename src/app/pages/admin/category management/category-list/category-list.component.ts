import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  display: boolean = false;
  cars: any[];

    cols: any[];

    constructor() {
      this.cols = [
        { field: 'vin', header: 'Vin' },
        {field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand' },
        { field: 'color', header: 'Color' }
    ];
      this.cars=[
        {'vin':"001","year":"2019","brand":"abc","color":"red"},
        {'vin':"001","year":"2019","brand":"abc","color":"red"},
        {'vin':"001","year":"2019","brand":"abc","color":"red"},
        {'vin':"001","year":"2019","brand":"abc","color":"red"}
      ]
     }

    ngOnInit() {
       

      
    }
    Addcategories() {
      this.display = true;
  }
  onDialogClose(event) {
     this.display = event;
  }
}
