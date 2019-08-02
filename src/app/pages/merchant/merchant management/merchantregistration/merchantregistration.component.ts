import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantDto,merchentFormData } from '../../modal/MerchantDto';
import { UsermanagementService } from 'src/app/pages/customer/services/usermanagement.service';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MerchantService } from '../../services/merchant.service';
import { Key } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { category } from 'src/app/pages/admin/model/category';
import { LocalStorageService } from 'angular-web-storage';



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
  selectList: Array<any> = [];
  checkedlist:Array<any>=[];
  currentIndex: string;
  submitbtntext: string = "Next";
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';
  
  iconimage: any = '';
  croppediconImage: any = '';

  display: boolean = false;
  termesdialogdisplay: boolean = false;

  @ViewChild('div') div: ElementRef;

  public show = false;
  
  _merchentFormData: merchentFormData = {
    Id: 0,
    Name: null,
    ProfileImage: null,
    Company: null,
    CompanyImage: null,
    //RegNo: null,
    //Address: null,
    Website: null,
    Country: null,
    //SPOCName: null,
    //Mobile: null,
    Email: null,
    Categories: null,
    SellCountries: null,
    //IsLegalApproved: 0,
    PWD:null,
    CPWD:null

  }

  
   reg:any= '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  responsesty: string='';
  smsmsg:string='';
  constructor(private formBuilder: FormBuilder, private merchantservice: MerchantService,
    private messageService: MessageService, private ngxService: NgxUiLoaderService,private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit() {

    this.merchantForm = this.formBuilder.group({
      Name: ['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]],
      Website: ['', [Validators.required,Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      Company: ['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]],
      Email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],      
      country: ['Select Country', Validators.required],
      categorie: ['select categories', Validators.required],
      SellCountries: ['', Validators.required],
      PWD: ['', [Validators.required,Validators.pattern('^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-9]+$'),Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required,Validators.pattern('^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-9]+$'),Validators.minLength(6)]],
    },
      {
        validator: MustMatch('PWD', 'confirmpassword')
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
   
    
    if (this._merchentFormData.Name != null) {

      if(this._merchentFormData.Name.match("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$"))
      {
        if ((this._merchentFormData.Name.length - 1 > -1)) {
          // if(this.registerdto.FirstName.match("('[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*')"))
          // {
          if (this._merchentFormData.Company != null) {
            
            if(this._merchentFormData.Company.match("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$"))
            {
              
              if (this._merchentFormData.Company.length - 1 > -1) {
                this.btndisable = "line_btn sblue";
              }
              if (this._merchentFormData.Company.length == 0) {
                
                this.btndisable = "disable";
              }
            }
            else
            {
              this.btndisable = "disable";
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
      else
      {
        this.btndisable = "disable";
      }

    }
    else {
      this.btndisable = "disable";
    }
  }

  CheckEmail() {

    //this.registerdto.email="swathi.chinnala@gmail.com";
    //this.ConvertingFormToDto();
    
    this.btndisable = "disable";
    if (this._merchentFormData.Email.length > 0 ) {
      
      if (this._merchentFormData.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')) {
        
        this.merchantservice.EmailVerification(this._merchentFormData).subscribe(res => {
          if (res["result"] === "Email is valid") {
            this.show=false;
            this.div.nativeElement.innerHTML=res["result"];
            this.responsesty="succsmsg";
            //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
            //  this.issucss=false;
            //  this.succsmsg=res["result"];
            this.btndisable = "line_btn sblue";
          }
          else if (res["result"] === "EmailId is already registred") {

            this.localStorage.set('sms',res["result"]);
            this.responsesty="errormsg";
            this.show=false;
            this.div.nativeElement.innerHTML=res["result"];
            //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: res["result"] });
            // this.errormsg=res["result"];
            // this.iserror=false;
            this.btndisable = "disable";
          }
        },
          errormsg => {
           
            this.responsesty="errormsg";
            this.show=false;
            this.div.nativeElement.innerHTML=errormsg["error"]["result"];
            //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
            // this.errormsg=errormsg["error"]["result"];
            // this.iserror=false;
            this.btndisable = "disable";

          });
      }
    }

    //this._merchentFormData.Email="swathi.chinnala@gmail.com";
    //this.ConvertingFormToDto();
    this.merchantservice.EmailVerification(this._merchentFormData).subscribe(res => {

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

    this._merchentFormData.Categories = this.merchantForm.value["categorie"];
    this._merchentFormData.SellCountries = this.merchantForm.value["SellCountries"];

    this.selectList.push(this._merchentFormData.SellCountries);
    this.checkedlist.push(this._merchentFormData.Categories);
    // for (var i = 0; i < this.selectList.length; i++) {
    //   if (this.selectList[i] == this._merchentFormData.SellCountries) {
    //     this.selectList.splice(i, 1);
    //   }
    // }
    this._merchentFormData.SellCountries=this.selectList.toString();
    this._merchentFormData.Categories=this.checkedlist.toString();
    
    this._merchentFormData.Name = this.merchantForm.value["Name"];
    this._merchentFormData.ProfileImage=this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
    this._merchentFormData.Company = this.merchantForm.value["Company"];
    this._merchentFormData.CompanyImage = this.iconimage.replace(/^data:image\/[a-z]+;base64,/, "");
    
    this._merchentFormData.Website = this.merchantForm.value["Website"];
    this._merchentFormData.Email = this.merchantForm.value["Email"];  
    this._merchentFormData.Country = this.merchantForm.value["country"];
    this._merchentFormData.PWD=this.merchantForm.value["PWD"];

    // this._merchentFormData.RegNo = this.merchantForm.value["RegNo"];
    // this._merchentFormData.Address = this.merchantForm.value["address"];
    // this._merchentFormData.SPOCName = this.merchantForm.value["SPOCName"];
    // this._merchentFormData.Mobile = this.merchantForm.value["mobile"];
   
    
    // this._merchentFormData.IsLegalApproved = this.merchantForm.value["IsLegalApproved"];
  
    
   
    
    
  
   
   
   
    

  }

  dropdownvalidation(){
    
    this.btndisable = "disable";
    if(this._merchentFormData.Country!=null){
      if(this._merchentFormData.Categories!=null){
      this.btndisable="line_btn sblue";
      }
    }
    else{
      this.btndisable = "disable";
    }
  }
 

  formauthdatavalidate() {
    
    this.smsmsg=this.localStorage.get('sms');
    
    this.btndisable = "disable";
    if (this._merchentFormData.Website != null) {
      if (this._merchentFormData.Website.match("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")) {
        if (this._merchentFormData.Email != null) {
          if (this._merchentFormData.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')) {
            if (this._merchentFormData.PWD != null) {
              if (this._merchentFormData.PWD.match('^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-9]+$')) {
                if (this._merchentFormData.PWD.length >= 6) {
                  if (this._merchentFormData.CPWD != null) {
                    if (this._merchentFormData.PWD == this._merchentFormData.CPWD) {
                     //if(this.show==true){
                       if(this.smsmsg!="EmailId is already registred"){
                      this.btndisable = "line_btn sblue";
                       }
                       else{
                        this.show=false;
                        this.div.nativeElement.innerHTML=this.smsmsg;
                      }
                      
                    }
                   
                  }
                 
                }
               
              }
            }
           

          }
        }

      }
    }

  }
        
      
      
     
  

  addmerchent() {
    

   this.show=true;
    const slides = document.getElementsByTagName('li');
    let i = 0;
    for (i = 0; i < slides.length; i++) {
      if (slides[i].getAttribute('class') === 'active') {
        this.currentIndex = slides[i].getAttribute('data-slide-to');
        
        if (Number.parseInt(this.currentIndex) != 3) {

          if (Number.parseInt(this.currentIndex) == 0) {
           
           // this.btndisable="disable";
            this.merchantForm.controls['country'].setValue(this.countries[0].value,{onlySelf: true});
            //this.merchantForm.controls['categorie'].setValue(this.categories[0].value,{onlySelf: true});
          }
          else if (Number.parseInt(this.currentIndex) == 1) {
            //this.dropdownvalidation();
            //this.otpformvalidate();            
            this.submitbtntext="Submit";
            //this.btndisable="disable";
            //this._merchentFormData.Country = this.merchantForm.value["country"];
            //this._merchentFormData.Categories=this.merchantForm.value["categories"];
          }
          else if (Number.parseInt(this.currentIndex) == 2) {
             
            
            this.btndisable="none";
            
            this.ConvertingFormToDto();
            // this._merchentFormData.Categories = this.merchantForm.value["categories"];
            // this._merchentFormData.SellCountries = this.merchantForm.value["SellCountries"];
        
            // this.selectList.push(this._merchentFormData.SellCountries);
            // this.checkedlist.push(this._merchentFormData.Categories);
          
            // this._merchentFormData.SellCountries=this.selectList.toString();
            // this._merchentFormData.Categories=this.checkedlist.toString();
        
           var MerchantDto: MerchantDto = {
            Id: this._merchentFormData.Id,
            Name: this._merchentFormData.Name,
            ProfileImage: this._merchentFormData.ProfileImage,
            Company: this._merchentFormData.Company,
            CompanyImage: this._merchentFormData.CompanyImage,
            
            Website: this._merchentFormData.Website,
            Country: this._merchentFormData.Country,
           
            Email: this._merchentFormData.Email,
            Categories: this._merchentFormData.Categories,
            SellCountries: this._merchentFormData.SellCountries,
           
            PWD:this._merchentFormData.PWD,
            
        
          }
         
          // if(MerchantDto.Country==null){
          //   if(MerchantDto.Categories==""){  
          //     if(MerchantDto.SellCountries==""){
          //       this.btndisable="disable";
          //       this.show=false;
          //       this.responsesty="errormsg";
          //       this.div.nativeElement.innerHTML="Please select at least one value";
          //     }
          //     else{
          //       this.btndisable="line_btn sblue";
          //     }
            
          //   }
          //   else{
          //     this.btndisable="line_btn sblue";
          //   }
          
          // }
        
          

            this.ProgressSpinnerDlg = true;
            
            
            this.merchantservice.merchentRegistration(MerchantDto).subscribe(res => {
              this.ProgressSpinnerDlg = false;
              this.show=false;
              this.responsesty="succsmsg";
              this.div.nativeElement.innerHTML=res["result"];
              //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
        
              // this.router.navigateByUrl('/');
              this.ResetForm();
              this.finalImage="";
              this.iconimage="";
              this.submitbtntext="Next";
              this.btndisable = "disable";

            },
              error => {
        
        
        
                this.ProgressSpinnerDlg = false;       
                this.show=false;
                this.responsesty="errormsg";
                this.div.nativeElement.innerHTML=error["result"];
                //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error["result"] });
              });
           
           
          }
        

          //this.btndisable = "disable";
        }
        

      }
    }

  }

  bindcategories() {
    this.merchantservice.Getcategories().subscribe(res => {
     
      Object.keys(res).map(Key => (
        this.categories.push({ label: res[Key]["name"], value: res[Key]["id"] })
      
      ));
      
    })

    
  }
  bindcountries() {
    this.merchantservice.GetCountries().subscribe(res => {    
       
      Object.keys(res).map(key => (
        this.countries.push({ label: res[key]["description"], value: res[key]["id"] })
      ));
    })
    
  }


  onKeyPress(event: any) {
   
    this.show = true;
  }

  catFilter(selectedCat:string){
    
    this._merchentFormData.SellCountries = selectedCat;
 }

  ResetForm() {

    this.merchantForm.reset({
      'Name': '',
      'Website': '',
      'Email': '',
      'mobile': '',
      'Address': '',
      'Country': 'Select Country',
      'Categories': '',
      'SellCountries': '',
      'PWD': '',
      'Company': '',
      'CompanyImage': '',     
       'Id': 0,
       'IsLegalApproved': 0,
      'ProfileImage': '',
    });
  }

  showTermsDialog() {
    this.termesdialogdisplay = true;
  }
  ontemsDialogClose(event) {
    this.termesdialogdisplay = event;
  }

}
