import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { category } from '../../model/category';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryService } from '../../services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  categoryForm: FormGroup;
  categorystatus: any[] = [];
  categorypriority: any[] = [];
  btndisable: string = "disable";

  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';

  categorieslist: Array<any> = [];
  // catetory:any={};

  catgegorydto: category = {
    Id: 0,
    Name: null,
    Image: null,
    Priority: 0,
    IsActive: null
  }


  constructor(private fb: FormBuilder, private catgservice: CategoryService,private messageService: MessageService) {
    this.categorystatus = [
      { label: 'Active', value: '1' },
      { label: 'NonActive', value: '0' }
    ];
    this.categorypriority = [
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' }
    ];
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      Name: ['', Validators.required],
      // Image:['',Validators.required],
      Priority: ['Select Priority', Validators.required],
      IsActive: ['Select Status', Validators.required],
    });

    this.categoryForm.controls['Priority'].setValue(this.categorypriority[0]["value"], { onlySelf: true });
    this.categoryForm.controls['IsActive'].setValue(this.categorystatus[0]["value"], { onlySelf: true });

    // this.categoryForm = this.fb.group({
    //   title: [],
    //   //selling_points: this.fb.array([this.fb.group({point:''})]),
    //   category: this.fb.array([
    //     this.fb.group({
    //       // Id:['',Validators.required],
    //       Name:['',Validators.required],
    //       Image:['',Validators.required],
    //       Priority:['',Validators.required],         
    //       IsActive:['Select Status',Validators.required],
    //     })
    //   ]),
    // });


  }

  get category() {
    return this.categoryForm.get('category') as FormArray;
  }

  // add() {
  //   this.categorieslist.push(this.catetory);
  //   this.catetory={};
  // }


  addSellingPoint() {
    // this.sellingPoints.push(this.fb.group({point:''}));
    this.category.push(this.fb.group(
      {
        Id: ['', Validators.required],
        Name: ['', Validators.required],
      }
    ));
  }

  deleteSellingPoint(index) {
    // this.sellingPoints.removeAt(index);
  }
  formvalidate() {
    if (this.categoryForm.valid) {
      this.btndisable = "line_btn sblue mr-4";
    }
    else {
      this.btndisable = "disable";
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  saveCropImage() {
    this.finalImage = this.croppedImage;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  onClose() {
    this.displayChange.emit(false);
  }
  redirectcustomerlist() {
    this.displayChange.emit(false);
  }

  AddCategory() {
    this.catgegorydto.Name = this.categoryForm.value["Name"];
    this.catgegorydto.IsActive = this.categoryForm.value["IsActive"];
    this.catgegorydto.Priority = this.categoryForm.value["Priority"];
    this.catgegorydto.Image = this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");

    this.categorieslist.push(this.catgegorydto);
  

    this.catgservice.Insertcategorylist(this.categorieslist).subscribe(res => {     
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      this.redirectcustomerlist();
    },
      error => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:error["error"]["result"]});
        
      });
  }
}
