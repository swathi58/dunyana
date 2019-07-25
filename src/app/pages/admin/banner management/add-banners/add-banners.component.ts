import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormArray } from '@angular/forms';
import{BannerDto}from '../../model/BannerDto';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styleUrls: ['./add-banners.component.scss']
})
export class AddBannersComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  bannerForm: FormGroup;
  bannerstatus:any[]=[];
  banlanguage:any[]=[];
  bancountry:any[]=[];
  Country: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  bannerslist:Array<any>=[];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  date1: Date;


  banner:BannerDto={
    Id:0,
    Country:null,
    Image:null,
    language:null,
    Status:0,
    IsDefault:0,
    StartDate:null,
    EndDate:null
  }
  btndisable:string="disable";
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.bannerForm = this.fb.group({ 
      Country:['', Validators.required],
      language: ['',Validators.required],
      IsDefault:['',Validators.required] ,
      Status:['',Validators.required],
      StartDate:['',''],
      EndDate:['','']
      });

    this.bannerstatus=[
      {label:'Active',value:'1'},
      {label:'NonActive',value:'0'}
    ];

    this.bancountry=[
      {label:'India',value:'India'},
      {label:'USA',value:'USA'}
    ];

    this.banlanguage=[
      {label:'Telugu',value:'Telugu'},
      {label:'English',value:'English'}
    ];
  }
 
  onClose(){
    this.displayChange.emit(false);
  }
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  
  }
  validateform() {
    if (this.bannerForm.valid) {
      this.btndisable = "line_btn sblue";
    }
    else {
      this.btndisable = "disable";
    }
  }
  
  

}
