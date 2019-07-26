import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { SharedModule } from '../../../../shared/shared.module';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  lang = 'en';
  headerlogo: string = "assets/layout/images/glogo.png";
  ProgressSpinnerDlg: boolean = false;
  @ViewChild('div') div: ElementRef;
  public show = false;
  forgotform: FormGroup;
  FirstregistrationForm: FormGroup;
  submitted = false;
  countries: any[] = [];
  default: string = 'United States';
  btndisable: string = "disable";
  currentIndex: string;
  otpnumb:string="";
  flag:boolean=false;

  activetab: string = "active";
  submitbtntext: string = "Verify";
  headertext:string="Forgot Your Password";
  timerbtntext: string = "Resend in";
  prevbtn: string = "none";

  timerbtndisplay: boolean = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';
  display: boolean = false;
  termesdialogdisplay: boolean = false;
  apiotp:any='';
  EmailOTP:string='';
  errmsg:string='';

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
    OTP:0
  }

  otp: OTP = {
    text1: null,
    text2: null,
    text3: null,
    text4: null,
    text5: null,
    text6: null
  }
  cars: any[];
  constructor(private formBuilder: FormBuilder, private userservice: UsermanagementService,
    private messageService: MessageService, private ngxService: NgxUiLoaderService,
    public translate: TranslateService, private localStorage: LocalStorageService,
    private router: Router) {

  }

  ngOnInit() {
    if (this.localStorage.get('lang') != null) {
      this.lang = this.localStorage.get('lang');
      this.translate.use(this.lang);
    }
    else {
      this.translate.use(this.lang);
    }
    this.forgotform = this.formBuilder.group({
      // FirstregistrationForm:this.formBuilder.array([this.BasicDetails()]),    
      emailid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],    
      password: ['', [Validators.required, Validators.minLength(6)]],  
      otp: ['', [Validators.required]]
    });
     this.apiotp= this.localStorage.get('otp');//sessionStorage.getItem('otp');
     this.ProgressSpinnerDlg = false;  
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


  
  formvalidate() {
    if (this.forgotform.valid) {
      this.btndisable = "line_btn sblue";
    }
    else {
      this.btndisable = "disable";
    }
  }
  

  formauthdatavalidate() {
    if (this.registerdto.Email != null) {
      if (this.registerdto.Email.length - 1 > -1) {
        if (this.registerdto.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')) {
         
          //this.btndisable = "line_btn sblue";
            
             this.CheckEmail();                             
        }
        else
        {
          this.btndisable = "disable";
        }
      }
    }
    else {
      this.btndisable = "disable";
    }
  }

  pwdauthdatavalidate(){
      if (this.registerdto.PWD.length != null) {
            if (this.registerdto.PWD.length >= 6) {
            this.btndisable = "line_btn sblue";
             }
             else{
              this.btndisable = "disable";
             }
          }
          else {
            this.btndisable = "disable";
          }

  }

  
  otpformvalidate() {
    console.log(this.otp);
  
    if(this.forgotform.value["otp"]!=null){
      
     
      this.EmailOTP=this.forgotform.value["otp"];
      
      if(this.EmailOTP.toString().length==6){
        this.otpnumb="numb";
      if(this.EmailOTP==this.registerdto.OTP.toString()){
        
      this.btndisable = "line_btn sblue";
      this.headertext= "Welcome Back";
    }
    else{
      this.btndisable = "disable";
      
      // this.show = false;
      // this.div.nativeElement.innerHTML = "OTP Mismatched";
      this.messageService.add({severity:'error', summary:'Error Message', detail:"OTP Mismatched"});         
     
    }
  }
  else
  {
    this.otpnumb=""
  }
}

    
  }

  
  ConvertingFormToDto() {

  
    this.registerdto.Email = this.forgotform.value["emailid"];
   
    this.registerdto.PWD = this.forgotform.value["password"];
   

  }

  CheckEmail() {
    //this.registerdto.email="swathi.chinnala@gmail.com";
    this.ConvertingFormToDto();
    
    if (this.registerdto.Email.length > 0 ) {
      
      if (this.registerdto.Email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')) {
        
        this.userservice.EmailVerification(this.registerdto).subscribe(res => {
          
          
          if(res["result"]=="Email is valid")
          {
            this.btndisable="disable";
            //this.messageService.add({ severity:'error', summary:'Error Message', detail:"Invalid Email"});
            this.show = false;
            this.div.nativeElement.innerHTML = "Invalid Email";
            
          }
          else{
          this.btndisable="line_btn sblue";
          }
        },
        errormsg => {
          this.show = false;
          this.div.nativeElement.innerHTML = errormsg["result"];
          //this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["result"]});         
          
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
        
        if (Number.parseInt(this.currentIndex) != 3) {
          console.log(this.currentIndex);

          if (Number.parseInt(this.currentIndex) == 0) {
           
            this.sendotp();
            // this.basicformvalidate();

          }
          else if (Number.parseInt(this.currentIndex) == 1) {

            //this.otpformvalidate();
            this.btndisable="disable";
            this.timerbtndisplay = true;
          }
          else if (Number.parseInt(this.currentIndex) == 2) {
            
            //this.pwdauthdatavalidate();
            this.submitbtntext = "Verify";
           this.headertext="welcome back";
           
            this.updatenewpwd();
          }
        

          //this.btndisable = "disable";
        }
        if (Number.parseInt(this.currentIndex) >= 0) {
          this.prevbtn = "backBtn";
        }

      }
    }
    this.ConvertingFormToDto();
    // this.ProgressSpinnerDlg=true;


    /* this.userservice.CustomerRegistration(this.registerdto).subscribe(res=>{
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
  onKeyPress(event: any) {
   
    this.show = true;
  }

  ResetForm() {

    this.forgotform.reset({
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

  sendotp(){
    
    this.ProgressSpinnerDlg=true;
    this.btndisable="disable";
    this.userservice.sendingotp(this.registerdto).subscribe(res => {
      this.ProgressSpinnerDlg=false;
      this.btndisable="disable";
      debugger
      //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
      this.show = false;
      this.div.nativeElement.innerHTML = res["result"];
      this.headertext="Verify Email";
     
      
      this.registerdto.OTP=res["otp"];
      //sessionStorage.setItem('otp',res["otp"]);      
      this.localStorage.set('otp',res["otp"]);
    },
      errormsg => {
        this.show = false;
      this.div.nativeElement.innerHTML = errormsg["error"]["result"];
      // this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
      });
  }

  updatenewpwd(){

    this.userservice.ChangePassword(this.registerdto).subscribe(res => {  
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
      
     
      setTimeout(() => {
        this.router.navigateByUrl('/signin');
      }, 1000);
   

    },
      errormsg => {
        
        //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errormsg["error"]["result"] });
        this.show = false;
        this.div.nativeElement.innerHTML = errormsg["result"];
      });
  }
  

}
