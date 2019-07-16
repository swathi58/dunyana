import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';

import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { RegistrationDto } from '../../model/DTOs/RegistraionDto';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UsermanagementService } from '../../services/usermanagement.service';
import {MessageService} from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  headerlogo:string="assets/layout/images/glogo.png";
  ProgressSpinnerDlg:boolean=false;
  registrationForm:FormGroup;
  submitted = false;
  countries:any[]=[]; 
  default: string = 'United States';

  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage:any='';
  display: boolean = false;

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
    EmailVerified:0
  }

  constructor(private formBuilder:FormBuilder, private userservice:UsermanagementService,
    private messageService: MessageService,private ngxService: NgxUiLoaderService,
    private router:Router) {  }

  ngOnInit() {

    this.registrationForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      emailid:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      address:['',Validators.required],
      country:['Select Country',Validators.required],
      city:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required]
 },
 {
  validator: MustMatch('password', 'confirmpassword')
   }
 );
  
 this.countries=[
  {label:'United States',value:'United States'},
  {label:'United Kingdom',value:'United Kingdom'},
  {label:'Afghanistan',value:'Afghanistan'}
];

this.registrationForm.controls['country'].setValue(this.countries[0]["label"], {onlySelf: true});
}


_keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }     
}


 fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;

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
showDialog() {
  this.display = true;
}

saveCropImage()
{
  this.finalImage=this.croppedImage;
  console.log(this.finalImage);
  
}
addcustomer() {
  console.log(this.registrationForm);

  this.registerdto.FirstName=this.registrationForm.value["firstname"];
  this.registerdto.LastName=this.registrationForm.value["lastname"];
  this.registerdto.Mobile=this.registrationForm.value["mobile"];
  this.registerdto.Email=this.registrationForm.value["emailid"];
  this.registerdto.Address=this.registrationForm.value["address"];
  this.registerdto.Country=this.registrationForm.value["country"];
  this.registerdto.City=this.registrationForm.value["city"];
  this.registerdto.PWD=this.registrationForm.value["password"];
 // this.registerdto.Image=this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
  this.registerdto.LoginType="D";
  this.ProgressSpinnerDlg=true;
  this.userservice.CustomerRegistration(this.registerdto).subscribe(res=>{
  this.ProgressSpinnerDlg=false;
  this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
 // this.router.navigateByUrl('/');
 this.ResetForm();
},
error=>{
  debugger
  this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
});
 }


 ResetForm()
 {

  this.registrationForm.reset({
    'firstname':'',
    'lastname':'',
    'mobile':'',
    'emailid':'',
    'address':'',
    'country':'Select Country',
    'city':'',
    'confirmpassword':'',
    'password':'',
  });
 }
}