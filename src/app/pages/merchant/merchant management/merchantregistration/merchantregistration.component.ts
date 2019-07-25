import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder, Validators}from '@angular/forms';
import { MerchantDto } from '../../modal/MerchantDto';
import { UsermanagementService } from 'src/app/pages/customer/services/usermanagement.service';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-merchantregistration',
  templateUrl: './merchantregistration.component.html',
  styleUrls: ['./merchantregistration.component.scss']
})
export class MerchantregistrationComponent implements OnInit {
  btndisable:string="disable";
  headerlogo:string="assets/layout/images/glogo.png";
  ProgressSpinnerDlg:boolean=false;
  merchantForm:FormGroup;
  submitted = false;
  countries:any[]=[]; 
  categories:any[]=[];
  default: string = 'United States';
  popup:string="";
 // popup:boolean=false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage:any='';

  iconimage:any='';
  croppediconImage:any='';

  display: boolean = false;
  termesdialogdisplay: boolean = false;
  merchantDto:MerchantDto={
    Id:0,
    Name :null,
    RegNo:null,
    Address:null,
    Website :null,
    Country:null,
    SPOCName :null,
    Mobile:null,
    Email:null,
    IsLegalApproved:0,
    Image :null
   }

  constructor(private formBuilder:FormBuilder, private userservice:UsermanagementService,
    private messageService: MessageService,private ngxService: NgxUiLoaderService,
    private router:Router) { }

  ngOnInit() {

    this.merchantForm=this.formBuilder.group({
      Name:['',Validators.required],
      Website:['',Validators.required],
      Company:['',Validators.required],
      emailid:['', [Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      address:['',Validators.required],
      country:['Select Country',Validators.required],
      categories:['select categories',Validators.required],
      Sell:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required,Validators.minLength(6)]
 },
 {
  validator: MustMatch('password', 'confirmpassword')
   }
 );
  
 this.countries=[
  {label:'India',value:'India'},
  {label:'United Kingdom',value:'United Kingdom'},
  {label:'Afghanistan',value:'Afghanistan'}
];

this.categories=[
  {label:'Accessories&Beauty',value:'Accessories&Beauty'},
  {label:'Fashion',value:'Fashion'},
  {label:'Shoes',value:'Shoes'},
  {label:'SportsFitness',value:'SportsFitness'},
  {label:'VirtualMall',value:'VirtualMall'}
]

this.merchantForm.controls['country'].setValue(this.countries[0]["label"], {onlySelf: true});
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
  this.croppediconImage=event.base64;

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

 this.popup="ht-auto";
  console.log(this.finalImage);
  
}

saveiconCropImage(){
  this.iconimage=this.croppediconImage;

  this.popup="ht-auto";
   console.log(this.iconimage);
   
}

formvalidate()
  {
    if(this.merchantForm.valid)
    {
      this.btndisable="line_btn sblue";
    }
    else
    {
      this.btndisable="disable";
    }
  }

  CheckEmail()
{
  //this.registerdto.Email="swathi.chinnala@gmail.com";
  this.ConvertingFormToDto();
  this.userservice.MerchantEmailVerification(this.merchantDto).subscribe(res=>{
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
  },
  errormsg=>{
      this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});   
  });
}

ConvertingFormToDto()
{

  this.merchantDto.Name=this.merchantForm.value["Name"];
  this.merchantDto.RegNo=this.merchantForm.value["RegNo"];
  this.merchantDto.Address=this.merchantForm.value["address"];
  this.merchantDto.Website=this.merchantForm.value["Website"];
  this.merchantDto.Country=this.merchantForm.value["country"];    
  this.merchantDto.SPOCName=this.merchantForm.value["SPOCName"];
  this.merchantDto.Mobile=this.merchantForm.value["mobile"];
  this.merchantDto.Email=this.merchantForm.value["emailid"];
  this.merchantDto.IsLegalApproved=this.merchantForm.value["IsLegalApproved"];
  this.merchantDto.Image=this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
  

}



addmerchent() {
this.ConvertingFormToDto();
  this.ProgressSpinnerDlg=true;
  this.userservice.merchentRegistration(this.merchantDto).subscribe(res=>{
  this.ProgressSpinnerDlg=false;
    this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});

 // this.router.navigateByUrl('/');
 this.ResetForm();
},
error=>{



  this.ProgressSpinnerDlg=false;
  console.log(error);
  this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
});
 }


 ResetForm()
 {

  this.merchantForm.reset({
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

 showTermsDialog() {
  this.termesdialogdisplay = true;
}
ontemsDialogClose(event) {
 this.termesdialogdisplay = event;
}

}
