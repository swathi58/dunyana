import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';
//import { MustMatch } from './_helpers/must-match.validator';

import { phoneNumberValidator } from '../../../../shared/validators/phone-validator';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { RegistrationDto } from '../../model/DTOs/RegistraionDto';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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

  constructor(private formBuilder:FormBuilder, private userservice:UsermanagementService) {  }

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

this.userservice.CustomerRegistration(this.registerdto).subscribe(res=>{
  console.log(res);
})
 }

}