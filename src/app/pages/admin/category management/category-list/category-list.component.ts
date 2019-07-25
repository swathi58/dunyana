import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { category } from '../../model/category';
import { MessageService } from 'primeng/api';
import { format } from 'util';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  display: boolean = false;
  imgdisplay: boolean = false;
  btndisable: string = "disable";
  editcatdisplay: boolean = false;

  @Output() displayChange = new EventEmitter();

  cols: any[];
  categorylist: any[] = [];
  updatecategorylist:any[]=[];
  categorystatus: any[] = [];
  categorypriority: any[] = [];

  categoryForm: FormGroup;
 
  finalImage: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  selectedcategory:any;
  
  catgegorydto: category = {
    Id: 0,
    Name: null,
    Image: null,
    Priority: 0,
    IsActive: null
  }
  constructor(private catgservice: CategoryService, private router: Router, private fb: FormBuilder,
              private messageService: MessageService) {
  this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Status' },
        { field: 'priority', header: 'Priority' },
        //{ field: 'image', header: 'Image' }
      ];

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
   

    this.GetCategoryList();
    this.categoryForm = this.fb.group({
      Id:['',Validators.required],
      Name: ['', Validators.required],
      // Image:['',Validators.required],
      Priority: ['Select Priority', Validators.required],
      IsActive: ['Select Status', Validators.required],
    });
  }

  formvalidate() {
    if (this.categoryForm.valid) {
      this.btndisable = "line_btn sblue mr-4";
    }
    else {
      this.btndisable = "disable";
    }
  }

  onDialogClose(event) {
    this.display = event;
    this.GetCategoryList();
  }
  onClose() {
    this.displayChange.emit(false);
  }
  redirectcustomertable() {
   this.editcatdisplay=false;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imgdisplay = true;
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

  GetCategoryList()
  {
    this.catgservice.CategoryList().subscribe(res => {
      this.categorylist = res;   
    });
  }

  Addcategories() {
    this.display = true;
    this.GetCategoryList();
    //this.router.navigateByUrl(`/admin/category/12`);

  }
  
  onRowSelect(event) {
    
    this.categoryForm.controls['Id'].setValue(event.data["id"]);
    this.categoryForm.controls['Name'].setValue(event.data["name"]);
    this.categoryForm.controls['Priority'].setValue(event.data["priority"].toString(), { onlySelf: true });
    this.categoryForm.controls['IsActive'].setValue(event.data["isActive"].toString(),{ onlySelf: true });
    this.finalImage = 'data:image/png;base64,' + event.data["image"];
    this.btndisable = "line_btn sblue mr-4";
    this.editcatdisplay = true;

  }

  updateCategory()
  {
    this.updatecategorylist=[];
    // console.log(this.categoryForm);
    this.catgegorydto.Id=this.categoryForm.value["Id"];
    this.catgegorydto.Name=this.categoryForm.value["Name"];
    this.catgegorydto.IsActive=this.categoryForm.value["IsActive"];
    this.catgegorydto.Priority=Number.parseInt(this.categoryForm.value["Priority"]);
    this.catgegorydto.Image=this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
    this.updatecategorylist.push(this.catgegorydto);
    this.catgservice.UpdateCategory(this.updatecategorylist).subscribe(res=>{
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      this.redirectcustomertable();
      this.GetCategoryList();
    },
    error=>{
      this.messageService.add({severity:'error', summary:'Error Message', detail:error["error"]["result"]});        
    });        
  }
}
