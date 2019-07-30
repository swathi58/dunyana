import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { RegistrationDto } from '../../model/DTOs/RegistraionDto';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UsermanagementService } from '../../services/usermanagement.service';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ChangepasswordDto } from '../../model/DTOs/ChangepasswordDto';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';
import { OTP } from '../../model/OTP';
import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import{Observable}from 'rxjs/Rx';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  lang = 'en';
  headerlogo: string = "assets/layout/images/glogo.png";
  checkinfo: string = "assets/layout/images/svg/success.svg";
  ProgressSpinnerDlg: boolean = false;
  registrationForm: FormGroup;
  FirstregistrationForm: FormGroup;
  submitted = false;
  countries: any[] = [];
  default: string = 'United States';
  btndisable: string = "disable";
  currentIndex: string;
  hidenextbtn: boolean = false;
  activetab: string = "active";
  submitbtntext: string = "Next";
  timerbtntext: string = "Resend in";
  prevbtn: string = "none";
  topheader: string = "";
  userdata:any;
  otpnumb:string="";

  iserror: boolean = true;
  issucss: boolean = true;
  errormsg: string = "";
  succsmsg: string = "";


  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';
  display: boolean = false;
  termesdialogdisplay: boolean = false;

  timerbtndisplay: boolean = true;
  verifybtndisplay:boolean=false;
  callDuration:string='';
  resendtext:string='Resend in 00:00';
  timetaken:any='';
  timerdata:any='';
  btnotpdis:string= "disable";
  otpdisable:string='';
  
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

  Otp: string = null;
  cars: any[];
  constructor(private formBuilder: FormBuilder, private userservice: UsermanagementService,
    private messageService: MessageService, private ngxService: NgxUiLoaderService,
    public translate: TranslateService, private localStorage: LocalStorageService,
    private router: Router,private elementRef: ElementRef) {

  }

  ngOnInit() {
    if (this.localStorage.get('lang') != null) {
      this.lang = this.localStorage.get('lang');
      this.translate.use(this.lang);
    }
    else {
      this.translate.use(this.lang);
    }
    this.registrationForm = this.formBuilder.group({
      //  FirstregistrationForm:this.formBuilder.array([this.BasicDetails()]),
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      otp: ['', Validators.required]
    },
      {
        validator: MustMatch('password', 'confirmpassword')
      }
    );

    // this.countries = [
    //   { label: 'KSA', value: 'KSA' },
    //   { label: 'United States', value: 'United States' },
    //   { label: 'United Kingdom', value: 'United Kingdom' }
    // ];

    // this.registrationForm.controls['country'].setValue(this.countries[0]["description"]);

    this.GetCountriesList();
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

  saveCropImage() {
    this.finalImage = this.croppedImage;
  }

  formvalidate() {
    if (this.registrationForm.valid) {
      this.btndisable = "line_btn sblue";
    }
    else {
      this.btndisable = "disable";
    }
  }
  basicformvalidate() {
    // if (this.registerdto.FirstName.match("^[^\s].+[^\s]$")) {
    //   console.log("valid");
    // }
    // else {
    //   console.log("invalid");
    // }
    if (this.registerdto.FirstName != null) {
      if ((this.registerdto.FirstName.length - 1 > -1)) {
        // if(this.registerdto.FirstName.match("('[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*')"))
        // {
        if (this.registerdto.LastName != null) {
          if (this.registerdto.LastName.length - 1 > -1) {
            this.btndisable = "line_btn sblue";
          }
          if (this.registerdto.LastName.length == 0) {
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

  formauthdatavalidate() {
   
    if (this.registerdto.Email != null) {
      if (this.registerdto.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')) {
        if (this.registerdto.PWD != null) {
          if (this.registerdto.PWD.length >= 6) {
            // this.CheckEmail();
            this.btndisable = "line_btn sblue";
          }
          if (this.registerdto.PWD.length == 0 || this.registerdto.PWD.length < 6) {
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

  Addressformvalidate() {

    if (this.registerdto.City != null) {
      if (this.registerdto.City.length - 1 > -1) {
        if (this.registerdto.Address != null) {
          if (this.registerdto.Address.length - 1 > -1) {
            this.btndisable = "line_btn sblue";
          }
          else if (this.registerdto.Address.length == 0) {
            this.btndisable = "disable";
          }
        }
      }
      else if (this.registerdto.City.length === 0) {
        this.btndisable = "disable";
      }
    }
    else {
      this.btndisable = "disable";
    }
  }
  contactformvalidate() {
    if (this.registerdto.Mobile != null) {
      if (this.registerdto.Mobile.length == 10) {
        this.btndisable = "line_btn sblue";
      }
      else if (this.registerdto.Mobile.length <= 9) {
        this.btndisable = "disable";
      }
    }
    else {
      this.btndisable = "disable";
    }
  }

  
  otpformvalidate() {
    this.timerdata = this.localStorage.get('timerdata');
    if (this.Otp != null) {
      console.log(this.Otp.toString().length);

      if (this.Otp.toString().length == 6) {
        this.otpnumb = "numb";
        debugger
        if (this.timerdata <= "01:00" || this.timerdata != "00:00") {
          debugger
          if (this.Otp == this.registerdto.OTP.toString()) {
          
            this.btndisable = "line_btn sblue";         
            this.btnotpdis="disabled";
            
  
            this.timerbtndisplay = true;
            this.verifybtndisplay = false;
            //this.resendtext = 'Resend in 00:00';
            this.callDuration = "";

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Invalid OTP" });
            // this.errormsg="Invalid OTP";
            // this.iserror=false;

            this.btndisable = "disable";
          }
        }
        else {
          this.btndisable = "disable";
          this.btnotpdis = "line_btn sblue";          
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: "Please Enter OTP With in 10 Minutes" });
          this.timerbtndisplay = true;
          this.verifybtndisplay = false;
          this.resendtext = 'Resend in 00:00';
          this.callDuration = "";
        }
      }
      else if (this.Otp.toString().length <= 5) {
        this.otpnumb = "";
      }
      else {
        this.btndisable = "disable";
      }

    }
    else {
      this.btndisable = "disable";
    }
  }


  prevclick() {

    const slides = document.getElementsByTagName('li');
    let i = 0;
    for (i = 0; i < slides.length; i++) {
      if (slides[i].getAttribute('class') === 'active') {
        this.currentIndex = slides[i].getAttribute('data-slide-to');

        if (Number.parseInt(this.currentIndex) == 1) {
          this.prevbtn = "none";
          this.topheader = "";
        }
        else {
          this.prevbtn = "backBtn";
        }

        if (Number.parseInt(this.currentIndex) == 4) {
          this.submitbtntext = "Verify";
        }
        if (Number.parseInt(this.currentIndex) <= 3) {
          this.submitbtntext = "Next";
        }
      }

    }
    this.basicformvalidate();
  }

  GetCountriesList() {
    this.userservice.GetCountriesList().subscribe(res => {
      this.countries = res;

      res.forEach(element => {
        // this.countries.push({ "label": element["id"], value: element["description"] });
        // this.countries = [
        //   { label: 'KSA', value: 'KSA' },
        //   { label: 'United States', value: 'United States' },
        //   { label: 'United Kingdom', value: 'United Kingdom' }
        // ];
      });
    })
  }
  ConvertingFormToDto() {

    this.registerdto.FirstName = this.registrationForm.value["firstname"];
    this.registerdto.LastName = this.registrationForm.value["lastname"];
    this.registerdto.Mobile = this.registrationForm.value["mobile"];
    this.registerdto.Email = this.registrationForm.value["emailid"];
    this.registerdto.Address = this.registrationForm.value["address"];
    this.registerdto.City = this.registrationForm.value["city"];
    this.registerdto.PWD = this.registrationForm.value["password"];
    this.registerdto.Image = this.finalImage.replace(/^data:image\/[a-z]+;base64,/, "");
    this.registerdto.LoginType = "D";
    console.log(this.registerdto);
  }

  CheckEmail() {
    //this.registerdto.Email="swathi.chinnala@gmail.com";
    this.ConvertingFormToDto();
    if (this.registerdto.Email != null) {
      if (this.registerdto.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')) {
        this.userservice.EmailVerification(this.registerdto).subscribe(res => {
          if (res["result"] === "Email is valid") {
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
            //  this.issucss=false;
            //  this.succsmsg=res["result"];
            //this.btndisable = "line_btn sblue";
          }
          else if (res["result"] === "EmailId is already registred") {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: res["result"] });
            // this.errormsg=res["result"];
            // this.iserror=false;
            this.btndisable = "disable";
          }
        },
          errormsg => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
            // this.errormsg=errormsg["error"]["result"];
            // this.iserror=false;
            this.btndisable = "disable";

          });
      }
    }
  }

  addcustomer() {

    const slides = document.getElementsByTagName('li');
    let i = 0;
    for (i = 0; i < slides.length; i++) {
      if (slides[i].getAttribute('class') === 'active') {
        this.currentIndex = slides[i].getAttribute('data-slide-to');
        console.log(this.currentIndex);
        if (Number.parseInt(this.currentIndex) >= 0) {
          
          this.prevbtn = "backBtn";
          this.topheader = "_top";
        }
        if (Number.parseInt(this.currentIndex) != 5) {

          if (Number.parseInt(this.currentIndex) == 0) {
            this.formauthdatavalidate();
            //  this.basicformvalidate();
           // this.prevbtn = "backBtn";

          }
          else if (Number.parseInt(this.currentIndex) == 1) {

            this.Addressformvalidate();

          }
          else if (Number.parseInt(this.currentIndex) == 2) {
            this.submitbtntext = "Verify";
            this.contactformvalidate();
            this.registerdto.Country = this.registrationForm.value["country"]["description"];

          }
          else if (Number.parseInt(this.currentIndex) == 3) {
            this.ConvertingFormToDto();
            this.ProgressSpinnerDlg=true;
            this.userservice.SendOTP(this.registerdto).subscribe(res => {
              // this.ProgressSpinnerDlg = false;             
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
              // this.issucss=false;
              // this.succsmsg=res["result"];
              this.registerdto.OTP = res["otp"];
              this.callDuration = this.elementRef.nativeElement.querySelector('#time');
              this.startTimer(this.callDuration);
              debugger
              this.timerbtndisplay = false;
              this.verifybtndisplay = true;
              //this.router.navigateByUrl('/');
              //this.ResetForm();
              this.ProgressSpinnerDlg=false;
            },
              error => {
                // this.ProgressSpinnerDlg = false;

                this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error["result"] });
                // this.errormsg=error["result"];
                // this.iserror=false;
              });

            this.submitbtntext = "Confirm";
            this.timerbtndisplay = false;
            this.otpformvalidate();
          }

          else if (Number.parseInt(this.currentIndex) == 4) {
            this.hidenextbtn = true;
            this.prevbtn = "none";
            this.topheader = "none";

            this.userservice.InsertCustomer(this.registerdto).subscribe(res => {
              // this.issucss=false;
              // this.succsmsg=res["result"];
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
              //this.localStorage.set("Email", res["reEmail"]);
              this.userdata = res['reFirstName'];
              this.localStorage.set('username', this.userdata);
              this.localStorage.set('Email', res['reEmail']);
              this.router.navigateByUrl("customer/customeraccount");
            });


          }
          else if (Number.parseInt(this.currentIndex) == 5) {

          }

          //this.btndisable = "disable";
        }


      }
    }

    // this.ProgressSpinnerDlg=true;


    /*   this.userservice.CustomerRegistration(this.registerdto).subscribe(res=>{
      this.ProgressSpinnerDlg=false;
        this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
    
     // this.router.navigateByUrl('/');
     this.ResetForm();
    },
    error=>{
    
      this.ProgressSpinnerDlg=false;
      console.log(error);
      this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
    }); */
  }

  resendotp(){
    this.ProgressSpinnerDlg=true;
    this.btndisable="disable";
    this.userservice.sendingotp(this.registerdto).subscribe(res => {
      this.ProgressSpinnerDlg=false;
      this.btndisable="disable";
      this.submitbtntext="Verify";
     this.verifybtndisplay=false;
     this.timerbtndisplay=true;
      debugger
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
      // this.show = false;
      // this.div.nativeElement.innerHTML = res["result"];
      
      
     
      this.registerdto.OTP=res["otp"];
      //sessionStorage.setItem('otp',res["otp"]);      
      this.localStorage.set('otp',res["otp"]);
      this.callDuration = this.elementRef.nativeElement.querySelector('#time');
      this.startTimer(this.callDuration);
      debugger
      this.timerbtndisplay=false;
      this.verifybtndisplay=true;
      this.btnotpdis = "disable";  
      this.resendtext="Resend in 00:00";
      this.otpdisable="";
     // this.show=true;

      
    },
      errormsg => {
        //this.show = false;
        this.verifybtndisplay=true;
        this.timerbtndisplay=false;
      //this.div.nativeElement.innerHTML = errormsg["error"]["result"];
       this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
      });
  }

  
  startTimer(display) {
    var timer = 60;
    var minutes;
    var seconds;
    console.log(display.textContent);
    var subscription= Observable.interval(1000).subscribe(x => {
        minutes = Math.floor(timer / 60);
        seconds = Math.floor(timer % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent ="Resend in "+ minutes + ":" + seconds;
       
        --timer;
        this.localStorage.set('timerdata', minutes + ":" + seconds);
       
        if (minutes + ":" + seconds == "00:00") {  
                               
          subscription.unsubscribe();
          this.btnotpdis = "line_btn sblue";         
          this.timerbtndisplay=false;
          this.verifybtndisplay=true;
          this.resendtext='Resend in 00:00';    
          this.callDuration="";
          this.otpdisable="disable";
          
        }
        console.log(this.timetaken);
    });
    
}


  ResetForm() {

    this.registrationForm.reset({
      'firstname': '',
      'lastname': '',
      'mobile': '',
      'emailid': '',
      'address': '',
      'country': 'Select Country',
      'city': '',
      'confirmpassword': '',
      'password': '',
    });
    this.finalImage = "";
  }

  showTermsDialog() {
    this.termesdialogdisplay = true;
  }
  ontemsDialogClose(event) {
    this.termesdialogdisplay = event;
  }
}