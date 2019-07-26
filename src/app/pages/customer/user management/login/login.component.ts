import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { AuthService } from 'angularx-social-login';

//import{ToastrService}from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NG_FORM_SELECTOR_WARNING } from '@angular/forms/src/directives';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  forgotspinner: boolean = true;
  forgotresmsg: any;
  loginForm: FormGroup;
  ForgetForm: FormGroup;
  @ViewChild('div') div: ElementRef;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('Ferror') Ferror: ElementRef;
  public show = false;

  userdata: any;

  headerlogo: string = "assets/layout/images/glogo.png";
  //default Variable display='none'; 
  lang = 'en';
  userPostData: User = {
    Email: "",
    FirstName: "",
    LastName: "",
    Mobile: "",
    Address: "",
    Country: "",
    City: "",
    Image: "",
    EmailVerified: 0,
    LoginType: "",
    FBID: "",
    GoogleID: "",
    PWD: "",
    Type: ""

  };
  public responseData: any;
  base64textString: string;
  file: any;
  Image: any;
  isBrowser: boolean;
  base64Image: any;
  submitted: boolean = false;
  ProgressSpinnerDlg: boolean;
  display: boolean = false;
  btndisable: string = "disable";
  btnfdisable: string = "disable";
  constructor(private dataservice: UsermanagementService, public translate: TranslateService, private localStorage: LocalStorageService,
    private router: Router, private formBuilder: FormBuilder, private messageService: MessageService) {

    this.dataservice.sessionIn();

  }

  showDialog() {
    this.display = true;
  }
  onDialogClose(event) {
    this.display = event;
  }

  ngOnInit() {
    if (this.localStorage.get('lang') != null) {
      this.lang = this.localStorage.get('lang');
      this.translate.use(this.lang);
    }
    else {
      this.translate.use(this.lang);
    }
    this.loginForm = this.formBuilder.group({
      lEmail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')]],
      lPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.ForgetForm = this.formBuilder.group({
      FEmail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')]]
    });

    this.ProgressSpinnerDlg = false;
    // ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}')
    //[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$'
  }


  // public socialSignIn(loginPlatform: string) {
  // let socialPlatformProvider;
  // if (loginPlatform === 'facebook') {
  // socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  // }
  // else if (loginPlatform === 'google') {
  // socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  // }


  // this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
  // console.log(loginPlatform + ' sign in data : ', (userData["firstName"]));

  // // console.log(userData["SocialUser"]);
  // // this.userPostData.firstname=data["SocialUser.firstName"];
  // // console.log(this.userPostData.firstname);
  // this.getBase64ImageFromURL(userData.photoUrl).subscribe(base64data => { 
  // console.log(base64data);
  // // this is the image as dataUrl
  // this.base64Image = 'data:image/jpg;base64,' + base64data;
  // userData.photoUrl=base64data;
  // debugger
  // this.apiConnection(userData);
  // });
  // // this.apiConnection(userData);

  // });
  // }

  // apiConnection(data) {
  // console.log(data);

  // if (data.email != undefined) {

  // if (data.provider == "FACEBOOK") {
  // data.provider = "F";

  // this.userPostData.FirstName = data.first_name;
  // this.userPostData.LastName = data.last_name;
  // this.userPostData.Email = data.email;
  // this.userPostData.FBID = data.id;
  // this.userPostData.GoogleID = "";
  // this.userPostData.LoginType = data.provider;
  // //this.userPostData.name=data.name; 
  // this.userPostData.Image=data.photoUrl; 


  // this.userPostData.Mobile = "";
  // this.userPostData.Address = "";
  // this.userPostData.Country = "";
  // this.userPostData.City = "";
  // this.userPostData.EmailVerified = null;
  // this.userPostData.PWD = "";
  // this.userPostData.Type = "";

  // }
  // else if (data.provider == "GOOGLE") {
  // data.provider = "G";
  // //data.photoUrl="download (1).jpg"
  // debugger
  // this.userPostData.FirstName = data.firstName;
  // this.userPostData.LastName = data.lastName;
  // this.userPostData.Email = data.email;
  // this.userPostData.GoogleID = data.id;
  // this.userPostData.FBID = "";
  // this.userPostData.LoginType = data.provider;
  // this.userPostData.Image=data.photoUrl;
  // debugger
  // //this.getBase64ImageFromURL(data.photoUrl);

  // //this.userPostData.Image=data.photoUrl.replace(/^data:image\/[a-z]+;base64,/,"");
  // //this.userPostData.Image = "";
  // this.userPostData.Mobile = "";
  // this.userPostData.Address = "";
  // this.userPostData.Country = "";
  // this.userPostData.City = "";
  // this.userPostData.EmailVerified = 0;
  // this.userPostData.PWD = "";
  // this.userPostData.Type = "";

  // }
  // else if(data.provider=="default") {
  // data.provider = "D";

  // this.userPostData.FirstName = "";
  // this.userPostData.LastName = "";
  // this.userPostData.Email = "";
  // this.userPostData.FBID = "";
  // this.userPostData.GoogleID = "";
  // this.userPostData.LoginType = data.provider;
  // this.userPostData.Image = data.photoUrl;

  // this.userPostData.Mobile = "";
  // this.userPostData.Address = "";
  // this.userPostData.Country = "";
  // this.userPostData.City = "";
  // this.userPostData.EmailVerified = null;
  // this.userPostData.PWD = "";
  // this.userPostData.Type = "";
  // debugger
  // }

  // debugger


  // }
  // else{

  // debugger

  // this.messageService.add({severity:'success', summary:'Success Message', detail:'Your Email id is not registerd in Facebook'});


  // }

  // }

  // getBase64ImageFromURL(url: string) {

  // return Observable.create((observer: Observer<string>) => {
  // debugger
  // let img = new Image();
  // img.crossOrigin = 'Anonymous';
  // img.src = url;
  // debugger
  // if (!img.complete) {
  // img.onload = () => {
  // observer.next(this.getBase64Image(img));
  // observer.complete();
  // debugger
  // };
  // img.onerror = (err) => {
  // observer.error(err);
  // };
  // debugger
  // } else {
  // observer.next(this.getBase64Image(img));
  // observer.complete();
  // }
  // });
  // }

  // getBase64Image(img: HTMLImageElement) {
  // var canvas = document.createElement("canvas");
  // canvas.width = img.width;
  // canvas.height = img.height;
  // var ctx = canvas.getContext("2d");
  // ctx.drawImage(img, 0, 0);
  // var dataURL = canvas.toDataURL("image/png");
  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  // }
  validateform() {
    if (this.loginForm.valid) {
      this.btndisable = "line_btn sblue";
    }
    else {
      this.btndisable = "disable";
    }
  }

  validateForgetform() {

    if (this.ForgetForm.valid) {
      this.btnfdisable = "line_btn sblue";
    }
    else {
      this.btnfdisable = "disable";

    }
  }

  OnLogin() {
    

    this.submitted = true;
    this.ProgressSpinnerDlg = true;

    // if (this.loginForm.invalid) {
    // return;
    // }

    // const loginPayload = {
    // username: this.loginForm.controls.lEmail.value,
    // password: this.loginForm.controls.lPassword.value
    // }
    this.userPostData.Email = this.loginForm.controls.lEmail.value;
    this.userPostData.PWD = this.loginForm.controls.lPassword.value;



    this.dataservice.login(this.userPostData).subscribe(res => {
      
      this.ProgressSpinnerDlg = false;
      this.userdata = res['reFirstName'];
      this.localStorage.set('username', this.userdata);
      this.localStorage.set('Email', res['reEmail']);
      //this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      if(res["loginStatus"]==1){
      this.show = false;
      this.div.nativeElement.innerHTML = res["result"];
      this.router.navigateByUrl("customer/customeraccount");
      this.Resetlog();
      }
      else if(res["loginStatus"]==0){
        this.show = false;
        this.div.nativeElement.innerHTML = res["result"];
      }

      else if(res["loginStatus"]==2){
        this.show = false;
        this.div.nativeElement.innerHTML = res["result"];
      }
      else if(res["loginStatus"]==3){
        this.show = false;
        this.div.nativeElement.innerHTML = res["result"];
      }

    },
      // error=>{
      // this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
      // });

      errormsg => {
        this.ProgressSpinnerDlg = false;
        console.log(errormsg["error"]["result"]);
        this.show = false;
        this.div.nativeElement.innerHTML = errormsg["error"]["result"];

        //this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
        //this.router.navigateByUrl("customer/home");

      });

  }

  Forgot() {
    this.forgotspinner = false;
    this.userPostData.Email = this.ForgetForm.controls.FEmail.value;
    this.ProgressSpinnerDlg = true;
    if (this.ForgetForm.invalid) {
      return;
    }

    this.dataservice.forget(this.userPostData).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res["result"] });
      this.show = false;
      // this.Ferror.nativeElement.innerHTML = res["result"];
      this.ResetForgot();

      //alert(res["result"]);
      //  this.ProgressSpinnerDlg = false;
      this.forgotspinner = true;
      this.forgotresmsg = res["result"];
      this.closeAddExpenseModal.nativeElement.click();
      //this.router.navigateByUrl("customer/home");

    },
      // error=>{
      // this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
      // });

      errormsg => {
        this.forgotspinner = true;
        console.log(errormsg["error"]["result"]);
        //this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
        this.show = false;
        this.Ferror.nativeElement.innerHTML = errormsg["error"]["result"];
        //this.router.navigateByUrl("customer/home");

      });
  }

  onKeyPress(event: any) {

    this.show = true;
  }

  Resetlog() {
    this.loginForm.reset({
      'lEmail': '',
      'lPassword': ''
    })
  }

  ResetForgot() {
    this.ForgetForm.reset({
      'FEmail': ''


    })
  }
  cancel() {
    this.closeAddExpenseModal.nativeElement.click();
  }

}