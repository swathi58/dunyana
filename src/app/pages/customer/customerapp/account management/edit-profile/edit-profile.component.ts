import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationDto } from '../../../model/DTOs/RegistraionDto';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'angular-web-storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  EditprofileForm:FormGroup;
  countries:any[]=[]; 
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage:any='';
  btndisable:string="disable";

  registerdto:RegistrationDto={
    Id:0,
    FirstName:null,
    LastName:null,
    Email:null,
    Mobile:null,
    Address:null,
    Country:null,
    City:null,
    Image:null,
    LoginType:null,
    FBID:null,
    GoogleID:null,
    PWD:null,
    Type:null,
    EmailVerified:0,
    Status:0,
    EncId:null,
    NPWD:null
  }
  profiledata=this.registerdto;

  constructor(private formBuilder:FormBuilder,private userservice:UsermanagementService,private localStorage: LocalStorageService) {
    this.countries=[  
      {label:'KSA',value:'KSA'},
      {label:'United States',value:'United States'},
      {label:'United Kingdom',value:'United Kingdom'}
    ];
    
   }

  ngOnInit() {
    
    this.FormInit();
  }

  FormInit()
  {
    this.EditprofileForm=this.formBuilder.group({

      firstname:['',Validators.required],
      lastname:['',Validators.required],
      // emailid:['',[Validators.required,Validators.email]],
      //emailid:['', [Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      address:['',Validators.required],
      country:['Select Country',Validators.required],
      city:['',Validators.required],
    });


    this.registerdto.Email=this.localStorage.get("Email");
    this.userservice.GetProfileInformation(this.registerdto).subscribe(res=>{

      this.EditprofileForm.controls['firstname'].setValue(res["firstName"], {onlySelf: true});
      this.EditprofileForm.controls['lastname'].setValue(res["lastName"], {onlySelf: true});
      this.EditprofileForm.controls['mobile'].setValue(res["mobile"], {onlySelf: true});
      this.EditprofileForm.controls['address'].setValue(res["address"], {onlySelf: true});
      this.EditprofileForm.controls['country'].setValue(res["country"], {onlySelf: true});
      this.EditprofileForm.controls['city'].setValue(res["city"], {onlySelf: true});
      this.finalImage='data:image/png;base64,'+res["image"];

      this.btndisable = "line_btn sblue mr-4";
      //this.profiledata.Id=res["id"];

     
     // console.log(this.profiledata["image"]);
    });
   
    

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
  redirectCustomer(){ 
    this.displayChange.emit(false);
  }
  
  saveCropImage() {
    this.finalImage = this.croppedImage;
  }
  formvalidate() {
    if (this.EditprofileForm.valid) {
      this.btndisable = "line_btn sblue mr-4";
     
    }
    else {
    
      this.btndisable = "disable";
    }
  }
  
_keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

Updateprofiledata()
{
  console.log(this.EditprofileForm);
  console.log(this.profiledata);
}
}
