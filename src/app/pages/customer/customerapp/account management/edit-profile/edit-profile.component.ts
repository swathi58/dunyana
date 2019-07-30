import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationDto } from '../../../model/DTOs/RegistraionDto';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'angular-web-storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';

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
  ProgressSpinnerDlg:boolean=false;
  response:string="";
  responsesty:string="";

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
    //EncId:null,
   // NPWD:null,
    OTP:0
  }
  profiledata=this.registerdto;

  constructor(private formBuilder:FormBuilder,private userservice:UsermanagementService,
    private localStorage: LocalStorageService,private messageService: MessageService) {
    // this.countries=[  
    //   {label:'KSA',value:'KSA'},
    //   {label:'United States',value:'United States'},
    //   {label:'United Kingdom',value:'United Kingdom'}
    // ];
    
   }

  ngOnInit() {
  

    this.FormInit();
  }

  FormInit()
  {
    this.GetCountriesList();
    this.EditprofileForm=this.formBuilder.group({

      firstname:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]],
      lastname:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]],
      // emailid:['',[Validators.required,Validators.email]],
      //emailid:['', [Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      address:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]],
      country:['Select Country',Validators.required],
      city:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]],
    });


    this.registerdto.Email=this.localStorage.get("Email");
    this.userservice.GetProfileInformation(this.registerdto).subscribe(res=>{
      console.log(res);
      this.profiledata.Id=res["id"];
      this.EditprofileForm.controls['firstname'].setValue(res["firstName"]);
      this.EditprofileForm.controls['lastname'].setValue(res["lastName"]);
      this.EditprofileForm.controls['mobile'].setValue(res["mobile"]);
      this.EditprofileForm.controls['address'].setValue(res["address"]);
      //this.EditprofileForm.controls['country'].setValue(res["country"]);
          // this.registrationForm.controls['country'].setValue(this.countries[0]["description"]);
      this.EditprofileForm.controls['country'].setValue(res["country"]);
      this.EditprofileForm.controls['city'].setValue(res["city"]);
      this.finalImage='data:image/png;base64,'+res["image"];

      this.btndisable = "line_btn sblue mr-4";
      //this.profiledata.Id=res["id"];
console.log(this.EditprofileForm.value);
     
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
  const pattern=/^([0-9]+ )+[0-9]+$|^[0-9]+$/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

GetCountriesList() {
  this.userservice.GetCountriesList().subscribe(res => {
  
    // res.foreach(item=>{        
    //   this.countries.push({label:item["id"],value:item["description"]});
    // });
    Object.keys(res).map(key => (
     this.countries.push({label:res[key]["description"], value:res[key]["description"]})    
      ));
  });
}

Updateprofiledata()
{
  this.ProgressSpinnerDlg=true;
  console.log(this.EditprofileForm.value);
  this.profiledata.Image=this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
  this.profiledata.FirstName=this.EditprofileForm.value["firstname"];
  this.profiledata.LastName=this.EditprofileForm.value["lastname"];
  this.profiledata.City=this.EditprofileForm.value["city"];
  this.profiledata.Address=this.EditprofileForm.value["address"];
  this.profiledata.Country=this.EditprofileForm.value["country"];
  this.profiledata.Mobile=this.EditprofileForm.value["mobile"];

  this.userservice.UpdateCustomerProfileData(this.profiledata).subscribe(res=>{
    //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
    this.response=res["result"];
    this.responsesty="succsmsg";
    this.HideResponse();
    setTimeout(() => {          
      this.redirectCustomer();
  }, 3000); 

    this.ProgressSpinnerDlg=false;
  },
  error=>{
    this.response="Something Went Wrong Please Try Again";
    this.responsesty="errormsg";
    this.HideResponse();
    //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Something Went Wrong Please Try Again"});
    this.redirectCustomer();
  });
}

HideResponse()
{
  setTimeout(() => {          
    this.response="";
}, 3000); 
}
}
