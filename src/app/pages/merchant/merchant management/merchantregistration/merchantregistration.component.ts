import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantDto } from '../../modal/MerchantDto';
import { UsermanagementService } from 'src/app/pages/customer/services/usermanagement.service';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MerchantService } from '../../services/merchant.service';
import { Key } from 'protractor';
@Component({
  selector: 'app-merchantregistration',
  templateUrl: './merchantregistration.component.html',
  styleUrls: ['./merchantregistration.component.scss']
})
export class MerchantregistrationComponent implements OnInit {
  btndisable: string = "disable";
  headerlogo: string = "assets/layout/images/glogo.png";
  ProgressSpinnerDlg: boolean = false;
  merchantForm: FormGroup;
  submitted = false;
  countries: any[] = [];
  categories: any[] = [];
  default: string = 'United States';
  popup: string = "";
  // popup:boolean=false;
  
  currentIndex: string;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';

  iconimage: any = '';
  croppediconImage: any = '';

  display: boolean = false;
  termesdialogdisplay: boolean = false;

  @ViewChild('div') div: ElementRef;

  public show = false;
  
  merchantDto: MerchantDto = {
    Id: 0,
    Name: null,
    ProfileImage: null,
    Company: null,
    CompanyImage: null,
    RegNo: null,
    Address: null,
    Website: null,
    Country: null,
    SPOCName: null,
    Mobile: null,
    Email: null,
    Categories: null,
    SellCountries: null,
    IsLegalApproved: 0,
    PWD:null,

  }

  constructor(private formBuilder: FormBuilder, private merchantservice: MerchantService,
    private messageService: MessageService, private ngxService: NgxUiLoaderService,
    private router: Router) { }

  ngOnInit() {

    this.merchantForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Website: ['', Validators.required],
      Company: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      country: ['Select Country', Validators.required],
      categories: ['select categories', Validators.required],
      SellCountries: ['', Validators.required],
      PWD: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required, Validators.minLength(6)]
    },
      {
        validator: MustMatch('password', 'confirmpassword')
      }
    );


    this.bindcountries();
    this.bindcategories();
   

  }




  // _keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     event.preventDefault();
  //   }
  // }

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
    this.croppediconImage = event.base64;

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

  saveCropImage() {
    this.finalImage = this.croppedImage;

    this.popup = "ht-auto";
    console.log(this.finalImage);

  }

  saveiconCropImage() {
    this.iconimage = this.croppediconImage;
    this.popup = "ht-auto";
    console.log(this.iconimage);

  }

  formvalidate() {
   
    if (this.merchantForm.valid) {
      this.btndisable = "line_btn sblue";
    }
    else {
      this.btndisable = "disable";
    }
  }

  CheckEmail() {

    //this.registerdto.email="swathi.chinnala@gmail.com";
    //this.ConvertingFormToDto();
    
    if (this.merchantDto.Email.length > 0 ) {
      
      if (this.merchantDto.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')) {
        
        this.merchantservice.EmailVerification(this.merchantDto).subscribe(res => {
          debugger
          
          if(res["result"]!="Email is valid")
          {                    
            this.show = false;
            this.div.nativeElement.innerHTML = res["result"];
            
          }
          else{
          this.btndisable="disable";
          this.show = false;
          this.div.nativeElement.innerHTML = res["result"];
          }
        },
        errormsg => {
          this.show = false;
          this.div.nativeElement.innerHTML = errormsg["result"];
          //this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["result"]});         
          
        });
      }
    }

    //this.merchantDto.Email="swathi.chinnala@gmail.com";
    this.ConvertingFormToDto();
    this.merchantservice.EmailVerification(this.merchantDto).subscribe(res => {

      this.show=false;
      this.div.nativeElement.innerHTML=res["result"];
      //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
    },
      errormsg => {

        this.div.nativeElement.innerHTML=errormsg["error"]["result"];
        //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
      });

  }

  ConvertingFormToDto() {

    this.merchantDto.Name = this.merchantForm.value["Name"];
    this.merchantDto.ProfileImage = this.merchantForm.value["ProfileImage"];
    this.merchantDto.Company = this.merchantForm.value["Company"];
    this.merchantDto.RegNo = this.merchantForm.value["RegNo"];
    this.merchantDto.Address = this.merchantForm.value["address"];
    this.merchantDto.Website = this.merchantForm.value["Website"];
    this.merchantDto.Country = this.merchantForm.value["country"];
    this.merchantDto.SPOCName = this.merchantForm.value["SPOCName"];
    this.merchantDto.Mobile = this.merchantForm.value["mobile"];
    this.merchantDto.Email = this.merchantForm.value["emailid"];
    this.merchantDto.Categories = this.merchantForm.value["Categories"];
    this.merchantDto.SellCountries = this.merchantForm.value["SellCountries"];
    this.merchantDto.IsLegalApproved = this.merchantForm.value["IsLegalApproved"];
    this.merchantDto.CompanyImage = this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
    this.merchantDto.ProfileImage=this.iconimage.replace(/^data:image\/[a-z]+;base64,/, "");
    this.merchantDto.PWD=this.merchantForm.value["PWD"];
    debugger

  }

  formauthdatavalidate() {


   this.show = true;

    if (this.merchantDto.Email != null) {
      if (this.merchantDto.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')) {
        this.CheckEmail();
        if (this.merchantDto.PWD != null) {
          if (this.merchantDto.PWD.length >= 6) {
            // this.CheckEmail();
            this.btndisable = "line_btn sblue";
          }
          if (this.merchantDto.PWD.length == 0 || this.merchantDto.PWD.length < 6) {
            this.btndisable = "disable";
          }
        }
      }
      else {
        this.btndisable = "disable";
      }

    }
    else {
      this.btndisable = "disable";
    }
  }

  addmerchent() {
    const slides = document.getElementsByTagName('li');
    let i = 0;
    for (i = 0; i < slides.length; i++) {
      if (slides[i].getAttribute('class') === 'active') {
        this.currentIndex = slides[i].getAttribute('data-slide-to');
        
        if (Number.parseInt(this.currentIndex) != 3) {
          console.log(this.currentIndex);

          if (Number.parseInt(this.currentIndex) == 2) {
            
            this.ConvertingFormToDto()
            this.ProgressSpinnerDlg = true;
            this.merchantservice.merchentRegistration(this.merchantDto).subscribe(res => {
              this.ProgressSpinnerDlg = false;
              this.show=false;
              this.div.nativeElement.innerHTML=res["result"];
              //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
        
              // this.router.navigateByUrl('/');
              this.ResetForm();
            },
              error => {
        
        
        
                this.ProgressSpinnerDlg = false;       
                this.show=false;
                this.div.nativeElement.innerHTML=error["result"];
                //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error["result"] });
              });
          
            
          }
         
        }
        

      }
    }
    
  }

  bindcategories() {
    this.merchantservice.Getcategories().subscribe(res => {
     
      Object.keys(res).map(Key => (
        this.categories.push({ label: res[Key]["name"], value: res[Key]["name"] })
      ));
    })
  }
  bindcountries() {
    this.merchantservice.GetCountries().subscribe(res => {     
      Object.keys(res).map(key => (
        this.countries.push({ label: res[key]["description"], value: res[key]["description"] })
      ));
    })
  }


  onKeyPress(event: any) {
   
    this.show = true;
  }


  ResetForm() {

    this.merchantForm.reset({
      'Name': '',
      'Website': '',
      'Email': '',
      'mobile': '',
      'address': '',
      'country': 'Select Country',
      'categories': '',
      'SellCountries': '',
      'PWD': '',
    });
  }

  showTermsDialog() {
    this.termesdialogdisplay = true;
  }
  ontemsDialogClose(event) {
    this.termesdialogdisplay = event;
  }

}
