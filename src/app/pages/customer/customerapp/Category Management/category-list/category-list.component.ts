import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  form:FormGroup;
  model: any = {};
  constructor(private fb: FormBuilder) {   
 
 }  

  ngOnInit() {
  
  }
  onSubmit() {
    alert('SUCCESS!! :-)\n\n');
  }
}
