import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { category } from '../../model/category';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  categoryForm: FormGroup;
  categorystatus:any[]=[];
  
  categorieslist:Array<any>=[];
 // catetory:any={};

  catg:category={
    Id:0,
    Name:null,
    Image:null,
    Priority:0,
    IsActive:null
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      title: [],
      //selling_points: this.fb.array([this.fb.group({point:''})]),
      category: this.fb.array([
        this.fb.group({
          // Id:['',Validators.required],
          Name:['',Validators.required],
          Image:['',Validators.required],
          Priority:['',Validators.required],         
          IsActive:['Select Status',Validators.required],
        })
      ]),
    });

    this.categorystatus=[
      {label:'Active',value:'1'},
      {label:'NonActive',value:'0'}
    ];
  }
  
  get sellingPoints() {
    return this.categoryForm.get('selling_points') as FormArray;
  }

  get category() {
    return this.categoryForm.get('category') as FormArray;
  }
  
  // add() {
  //   this.categorieslist.push(this.catetory);
  //   this.catetory={};
  // }
  onClose(){
    this.displayChange.emit(false);
  }

  addSellingPoint() {
   // this.sellingPoints.push(this.fb.group({point:''}));
      this.category.push(this.fb.group(
        {
          Id:['',Validators.required],
          Name:['',Validators.required],
        }
      ));
  }

  deleteSellingPoint(index) {
   // this.sellingPoints.removeAt(index);
  }
  
}
