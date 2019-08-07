import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantDto, merchentFormData } from '../../modal/MerchantDto';
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
import { RegistrationDto } from '../../../customer/model/DTOs/RegistraionDto';

@Component({
  selector: 'app-merchantregistration',
  templateUrl: './merchantregistration.component.html',
  styleUrls: ['./merchantregistration.component.scss']
})



export class MerchantregistrationComponent implements OnInit {

  checkinfo: string = "assets/layout/images/svg/success.svg";
  btndisable: string = "disable";
  btnupload: string = "uploadimgsty uploadimgsty2";
  btnupload1: string = "uploadimgsty uploadimgsty1";
  headerlogo: string = "assets/layout/images/glogo.png";
  ProgressSpinnerDlg: boolean = false;
  merchantForm: FormGroup;
  submitted = false;
  countries: any[] = [];
  categories: any[] = [];
  sellcountry: any[] = [];
  default: string = 'United States';
  popup: string = "";
  // popup:boolean=false;
  selectList: Array<any> = [];
  checkedlist: Array<any> = [];
  currentIndex: string;
  submitbtntext: string = "Next";
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';
  prevbtn: string = "none";
  previosusbtn: boolean = true;
  iconimage: any = '';
  croppediconImage: any = '';

  display: boolean = false;
  termesdialogdisplay: boolean = false;
  flage: boolean = true;
  filelength: string = '';
  checkimage: boolean = true;
  //couraselHref: string;

  @ViewChild('div') div: ElementRef;

  public show = false;

  txtErrormsg:boolean=true;
  txtErrorresponse:string="";
  nextslide:string="next";
  namePattern:string='^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-9]+$';
  addressPattern:string='^([A-Za-z0-9,-/]+ )+[A-Za-z0-9,-/]+$|^[A-Za-z0-9,-/]+$';
  passwordPattern:string='^([A-Za-z0-9!@#$%^&*(),.?":{}]+ )+[A-Za-z0-9!@#$%^&*(),.?":{}]+$|^[A-Za-z0-9!@#$%^&*(),.?":{}]+$';//'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
  emailPattern:string='[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}';
  webReg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  emailValiderrormsg:string="";
  pwdValiderrormsg:string="";
  websitevalidmsg:string="";
  cpwdValiderrormsg:string="";

  merwebsite: boolean = true;
  meremail: boolean = true;
  merpwdleter: boolean = true;
  merpwdlength: boolean = true;
  mercpwd: boolean = true;

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
    PWD: null,
    CPWD: null

  }

  registerdto: RegistrationDto = {
    Id: 0,
    FirstName: null,
    LastName: null,
    Email: null,
    Mobile: null,
    Address: null,
    Country: null,
    City: null,
    Image: null,
    LoginType: null,
    FBID: null,
    GoogleID: null,
    PWD: null,
    Type: null,
    EmailVerified: 0,
    Status: 0,
    // EncId: null,
    // NPWD: null,
    OTP: 0
  }


  responsesty: string = '';
  smsmsg: string = '';
  hidenextbtn: boolean;
  topheader: string;
  fileSelected: boolean = true;
  constructor(private formBuilder: FormBuilder, private merchantservice: MerchantService,
    private messageService: MessageService, private ngxService: NgxUiLoaderService, private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit() {

    this.merchantForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      Website: ['', [Validators.required, Validators.pattern(this.webReg)]],
      Company: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country: ['Select Country', Validators.required],
      categorie: ['select categories', Validators.required],
      CompanyImage: ['', Validators.required],
      SellCountrie: ['', Validators.required],
      PWD: ['', [Validators.required, Validators.pattern(this.passwordPattern), Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(this.passwordPattern), Validators.minLength(6)]],
    },
      {
        validator: MustMatch('PWD', 'confirmpassword')
      }
    );

    this.countries.push({ label: 'Select Country', value: '' });
    this.bindcountries();
    this.bindcategories();

  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  iconChangeEvent(event: any): void {
    this.imageChangedEvent = event;


  }

  fileChangeEvent(event: any): void {

    this.imageChangedEvent = event;

    var files = event.srcElement.files;
    console.log(files);

    if (files.length > 0) {
      this.fileSelected = false;
      this.formvalidate();
    };

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppediconImage = event.base64;

  }
  imageLoaded() {
   
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  // showDialog() {
  //   this.display = true;
  // }

  saveCropImage() {
    this.finalImage = this.croppedImage;
    this.btnupload1 = "uploadimgsty";
    this.popup = "ht-auto";
    console.log(this.finalImage);

  }

  saveiconCropImage() {
    this.fileSelected = true;
    this.iconimage = this.croppediconImage;
    this.btnupload = "uploadimgsty";
    this.popup = "ht-auto";
    console.log(this.iconimage);

  }


  formvalidate() {


    if (this._merchentFormData.Name != null) {

      if (this._merchentFormData.Name.match('^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-9]+$')) {
        if ((this._merchentFormData.Name.length - 1 > -1)) {
          // if(this.registerdto.FirstName.match("('[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*')"))
          // {
          if (this._merchentFormData.Company != null) {

            if (this._merchentFormData.Company.match("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$")) {

              if (this._merchentFormData.Company.length - 1 > -1) {


                if (this.fileSelected == false) {
                  this.btndisable = "line_btn sblue";
                  this.fileSelected = true;
                }
              }
              if (this._merchentFormData.Company.length == 0) {

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
        else {
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

  CheckEmail() {
    this.btndisable = "disable";
    if (this._merchentFormData.Email.length > 0) {
      if (this._merchentFormData.Email.match(this.emailPattern)) {
        this.convertMailDto();
        this.merchantservice.EmailVerification(this.registerdto).subscribe(res => {

          if (res["result"] === "Email is valid") {
            this.localStorage.clear();
            this.localStorage.set('sms', res["result"]);
            this.show = true;        
          }

          else if (res["result"] === "Email Id already registered") {
            this.localStorage.clear();
            this.localStorage.set('sms', res["result"]);
            this.responsesty = "errormsg";
            this.show = false;
            this.div.nativeElement.innerHTML = res["result"];

            // this.HideResponse();
            //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: res["result"] });
            // this.errormsg=res["result"];
            // this.iserror=false;
            this.btndisable = "disable";
          }
        },
          errormsg => {
            this.localStorage.clear();
            this.localStorage.set('sms', errormsg["error"]["result"]);
            this.responsesty = "errormsg";

            //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
            // this.errormsg=errormsg["error"]["result"];
            // this.iserror=false;
            this.btndisable = "disable";

          });
      }
    }


  }

  convertMailDto() {
    this.registerdto.Email = this.merchantForm.value["Email"];
    this.registerdto.EmailVerified = 0;
    this.registerdto.FirstName = "";
    this.registerdto.LastName = "";
    this.registerdto.Mobile = ""
    this.registerdto.Address = "";
    this.registerdto.City = "";
    this.registerdto.PWD = "";
    this.registerdto.Image = "";
    this.registerdto.LoginType = "D";
  }

  ConvertingFormToDto() {

    this._merchentFormData.Categories = this.merchantForm.value["categorie"];
    this._merchentFormData.SellCountries = this.merchantForm.value["SellCountrie"];
    this.selectList.length = 0;
    this.checkedlist.length = 0;
    this.selectList.push(this._merchentFormData.SellCountries);
    this.checkedlist.push(this._merchentFormData.Categories);
    // for (var i = 0; i < this.selectList.length; i++) {
    // if (this.selectList[i] == this._merchentFormData.SellCountries) {
    // this.selectList.splice(i, 1);
    // }
    // }
    const tab = this.selectList.reduce((acc, value) => !acc.includes(value) ? acc.concat(value) : acc, []).join(',');
    const tab2 = this.checkedlist.reduce((acc, value) => !acc.includes(value) ? acc.concat(value) : acc, []).join(',');
    console.log(tab) //"2,5,3"
    console.log(tab2)

    this._merchentFormData.SellCountries = tab;
    this._merchentFormData.Categories = tab2;

    this._merchentFormData.Name = this.merchantForm.value["Name"];
    this._merchentFormData.ProfileImage = this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
    this._merchentFormData.Company = this.merchantForm.value["Company"];
    this._merchentFormData.CompanyImage = this.iconimage.replace(/^data:image\/[a-z]+;base64,/, "");

    this._merchentFormData.Website = this.merchantForm.value["Website"];
    this._merchentFormData.Email = this.merchantForm.value["Email"];
    this._merchentFormData.Country = this.merchantForm.value["country"];
    this._merchentFormData.PWD = this.merchantForm.value["PWD"];


  }

  dropdownvalidation() {

    this.btndisable = "disable";
    debugger
    if (this._merchentFormData.Categories != null) {
      if (this._merchentFormData.Categories.length !== 0) {

        if (this._merchentFormData.Country !== null) {
          if(this._merchentFormData.Country!==""){
          if (this._merchentFormData.SellCountries != null) {
            if (this._merchentFormData.SellCountries.length !== 0) {

              this.btndisable = "line_btn sblue";
              this.show = true;
              this.flage = true;
            } else {
              debugger
              this.responsesty = "errormsg";
              this.div.nativeElement.innerHTML = "please select merchant sell countries";
              this.show = false;
              this.flage = false;
            }
          } else {
            this.responsesty = "errormsg";
            this.div.nativeElement.innerHTML = "please select merchant sell countries";
            this.show = false;
            this.flage = false;

          }
        }else {
          this.responsesty = "errormsg";
          this.div.nativeElement.innerHTML = "please select merchant countrie name";
          this.show = false;
          this.flage = false;
        }
      }else {
        this.responsesty = "errormsg";
        this.div.nativeElement.innerHTML = "please select merchant countrie name";
        this.show = false;
        this.flage = false;
      }
      } else {
        debugger
        this.responsesty = "errormsg";
        this.show = false;
        this.flage = false;
        this.div.nativeElement.innerHTML = "please select merchant categories name";

      }
    } else {
      this.responsesty = "errormsg";
      this.show = false;
      this.flage = false;
      this.div.nativeElement.innerHTML = "please select merchant categories name";

    }
  }


  formauthdatavalidate() {
    
    if (this._merchentFormData.Website != null) {
      if (this._merchentFormData.Website.length > 0) {
        if (this._merchentFormData.Website.match(this.webReg)) {
          this.txtErrormsg = true;
          this.websitevalidmsg = "";
          if (this._merchentFormData.Email != null) {
            if (this._merchentFormData.Email.length > 0) {
              if (this._merchentFormData.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')) {
                this.CheckEmail();
                this.smsmsg = this.localStorage.get('sms');
                this.txtErrormsg = true;
                this.emailValiderrormsg = "";
                
                if (this._merchentFormData.PWD != null) {


                  if (this._merchentFormData.PWD.length >= 6) {
                    if (this._merchentFormData.PWD.match(this.passwordPattern)) {
                      this.txtErrormsg = true;
                      this.pwdValiderrormsg = "";
                      //this.btndisable = "line_btn sblue";
                      if (this._merchentFormData.CPWD != null) {
                       if(this._merchentFormData.CPWD.length!=0){
                        if (this._merchentFormData.PWD == this._merchentFormData.CPWD) {
                         this.txtErrormsg = true;
                         this.cpwdValiderrormsg="";
                          if (this.smsmsg !== "EmailId is already registred") {
                            this.btndisable = "line_btn sblue";
                            //this.HideResponse();
                            //this.show=true;
                          }
                        } else {
                          this.btndisable = "disable";
                          this.txtErrormsg=false;
                          this.cpwdValiderrormsg="Confirm password must match with password";
                        }
                      }else{
                        this.btndisable = "disable";
                        this.txtErrormsg=false;
                        this.cpwdValiderrormsg="Please enter confirm password";
                      }
                    }
                      else {
                       
                          this.btndisable = "disable";
                      }
                    }
                    else {
                      this.btndisable = "disable";
                      this.txtErrormsg = false;
                      this.pwdValiderrormsg = "Password not allowed spaces";
                    }

                    // this.btndisable = "line_btn sblue";  
                  }
                  else if (this._merchentFormData.PWD.length == 0) {
                    this.txtErrormsg = false;
                    this.pwdValiderrormsg = "Please enter password";
                    this.btndisable = "disable";
                  }
                  else if ((this._merchentFormData.PWD.length < 6) && (this._merchentFormData.PWD.length > 0)) {
                    this.btndisable = "disable";
                    this.txtErrormsg = false;
                    this.pwdValiderrormsg = "Password must be at least 6 characters";
                  }

                }
                else {
                  this.btndisable = "disable";
                }
              }
              else {
                this.txtErrormsg = false;
                this.emailValiderrormsg = "Please enter valid email";
                this.btndisable = "disable";
              }
            }
            else {
              this.txtErrormsg = false;
              this.emailValiderrormsg = "Please enter email";
              this.btndisable = "disable";
            }

          }
          else {
            this.btndisable = "disable";
          }
        } else {
          this.txtErrormsg = false;
          this.websitevalidmsg = "Please enter valid website link";
        }
      } else {
        this.txtErrormsg = false;
        this.websitevalidmsg = "Please enter website link";
      }

    } else {
      this.btndisable = "disable";
    }
  }
  
 

  HideResponse() {
    setTimeout(() => {
      this.show = true;
    }, 5000);
  }

  prevclick() {

    this.btndisable = "line_btn sblue";
    const slides = document.getElementsByTagName('li');
    let i = 0;
    for (i = 0; i < slides.length; i++) {
      if (slides[i].getAttribute('class') === 'active') {
        this.currentIndex = slides[i].getAttribute('data-slide-to');

        if (Number.parseInt(this.currentIndex) == 1) {
          //this.prevbtn = "none";
          this.previosusbtn = true;

        }
        else {
          this.prevbtn = "backBtn";
          this.previosusbtn = false;
        }

        if (Number.parseInt(this.currentIndex) == 2) {
          this.submitbtntext = "Submit";
        }
        if (Number.parseInt(this.currentIndex) <= 2) {
          this.submitbtntext = "Next";
        }
      }

    }

  }

  addMerchent() {
    
    this.btndisable = "disable";
    this.show = true;
    const slides = document.getElementsByTagName('li');
    let i = 0;

    for (i = 0; i < slides.length; i++) {

      if (slides[i].getAttribute('class') === 'active') {


        this.currentIndex = slides[i].getAttribute('data-slide-to');



        if (Number.parseInt(this.currentIndex) >= 0) {

          this.previosusbtn = false;

          this.topheader = "_top";
        }

        if (Number.parseInt(this.currentIndex) != 3) {

          if (Number.parseInt(this.currentIndex) == 0) {
          
            //this.merchantForm.controls['country'].setValue(this.countries[0].value,{onlySelf: true});
            this.previosusbtn = false;
            // this.couraselHref = "#demo-1";
            //this.merchantForm.controls['categorie'].setValue(this.categories[0].value,{onlySelf: true});
          }
          if (Number.parseInt(this.currentIndex) == 1) {
            //this.dropdownvalidation();
            //this.otpformvalidate(); 
            this.submitbtntext = "Submit";
            //this.btndisable = "line_btn sblue";
            // this.couraselHref = "#demo-2";
            //this.btndisable="disable";
            //this._merchentFormData.Country = this.merchantForm.value["country"];
            //this._merchentFormData.Categories=this.merchantForm.value["categories"];
          } else if (Number.parseInt(this.currentIndex) == 2) {

            this.hidenextbtn = true;

            this.show = false;
            this.ConvertingFormToDto();
           // this.dropdownvalidation();
            /*if (!this.show || !this.flage) {
            this.btndisable = "line_btn sblue";
            this.couraselHref = "#demo-3";
            }*/
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

              PWD: this._merchentFormData.PWD,


            }

         

            if (this.flage==true) {
              this.ProgressSpinnerDlg = true;


              this.merchantservice.merchentRegistration(MerchantDto).subscribe(res => {
                this.ProgressSpinnerDlg = false;
                this.show = false;
                this.responsesty = "succsmsg";
                this.checkimage = false;
                this.div.nativeElement.innerHTML = res["result"];
                setTimeout(() => {

                  this.router.navigateByUrl('/signin');
                }, 1000);

                this.ResetForm();
                this.finalImage = "";
                this.iconimage = "";

                this.btndisable = "disable";
                this.previosusbtn = true;

              },
                error => {

                  this.ProgressSpinnerDlg = false;
                  this.show = false;
                  this.responsesty = "errormsg";
                  this.div.nativeElement.innerHTML = error["result"];

                  //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error["result"] });
                });

            }
            else {
              this.btndisable = "disable";
              this.show = false;
              this.div.nativeElement.innerHTML = "Please select dropdown values";
              return false;

            }
          }

          //this.btndisable = "disable";
        }



      }
    }

  }

  bindcategories() {
    this.categories.length=0;
    this.merchantservice.Getcategories().subscribe(res => {

      Object.keys(res).map(Key => (
        this.categories.push({ label: res[Key]["name"], value: res[Key]["id"] })

      ));

    })


  }
  bindcountries() {
    this.sellcountry.length=0;
    this.merchantservice.GetCountries().subscribe(res => {
      // this.countries.push({ label: 'Select Country', value: '' });

      Object.keys(res).map(key => (
        this.countries.push({ label: res[key]["description"], value: res[key]["id"] }),
        this.sellcountry.push({ label: res[key]["description"], value: res[key]["id"] })

      ));
    })

  }
  // bindsellcountries(){
  // this.merchantservice.GetCountries().subscribe(res => {

  // Object.keys(res).map(key => (

  // this.sellcountry.push({ label: res[key]["description"], value: res[key]["id"] })

  // ));
  // })
  // }

  onKeyPress(event: any) {

    this.show = true;
  }

  catFilter(selectedCat: string) {

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



}