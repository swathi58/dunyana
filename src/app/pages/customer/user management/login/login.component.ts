import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider,AuthService,SocialLoginModule } from 'angularx-social-login';

//import{ToastrService}from 'ngx-toastr';
import {MessageService} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Observer } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NG_FORM_SELECTOR_WARNING } from '@angular/forms/src/directives';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {




  loginForm:FormGroup;
  ForgetForm:FormGroup;
  @ViewChild('div') div:ElementRef;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('Ferror')Ferror:ElementRef;
  public show = false;

  userdata:any;
  
  headerlogo:string="assets/layout/images/glogo.png";
  display='none'; //default Variable
  userPostData:User={
      Email:"",
      FirstName:"",
      LastName:"",
      Mobile:"",
      Address:"",      
      Country:"",
      City:"",
      Image:"",
      EmailVerified:0,
      LoginType:"",
      FBID:"",
      GoogleID:"",
      PWD:"",
      Type:""

  };
  public responseData: any;
  base64textString: string;
  file: any;
  Image: any;
  isBrowser: boolean;
  base64Image: any;
  submitted: boolean=false;
  ProgressSpinnerDlg: boolean;

 

  constructor(private dataservice:UsermanagementService,private socialAuthService: AuthService,
private router: Router,  private messageService: MessageService,private formBuilder: FormBuilder, ) {

      this.dataservice.sessionIn();

     }

  ngOnInit() {
       
    this.loginForm = this.formBuilder.group({      
       lEmail:['', [Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$')]],
       lPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]      
     });

     this.ForgetForm=this.formBuilder.group({
      FEmail:['', [Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$')]]
     });
     debugger
     this.ProgressSpinnerDlg=false;
    // ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{3,}')
    //[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$'
}


  public socialSignIn(loginPlatform: string) {
    let socialPlatformProvider;
    if (loginPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
     else if (loginPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
  

    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      console.log(loginPlatform + ' sign in data : ', (userData["firstName"]));

      // console.log(userData["SocialUser"]);
      // this.userPostData.firstname=data["SocialUser.firstName"];
      // console.log(this.userPostData.firstname);
      this.getBase64ImageFromURL(userData.photoUrl).subscribe(base64data => {    
        console.log(base64data);
        // this is the image as dataUrl
        this.base64Image = 'data:image/jpg;base64,' + base64data;
        userData.photoUrl=base64data;
        debugger
        this.apiConnection(userData);
      });
     // this.apiConnection(userData);

    });
  }

  apiConnection(data) {
    console.log(data);
    
    if (data.email != undefined) {

      if (data.provider == "FACEBOOK") {
        data.provider = "F";

        this.userPostData.FirstName = data.first_name;
        this.userPostData.LastName = data.last_name;
        this.userPostData.Email = data.email;
        this.userPostData.FBID = data.id;
        this.userPostData.GoogleID = "";
        this.userPostData.LoginType = data.provider;
        //this.userPostData.name=data.name;              
        this.userPostData.Image=data.photoUrl; 
        

        this.userPostData.Mobile = "";
        this.userPostData.Address = "";
        this.userPostData.Country = "";
        this.userPostData.City = "";
        this.userPostData.EmailVerified = null;
        this.userPostData.PWD = "";
        this.userPostData.Type = "";

      }
      else if (data.provider == "GOOGLE") {
        data.provider = "G";
        //data.photoUrl="download (1).jpg"
        debugger
        this.userPostData.FirstName = data.firstName;
        this.userPostData.LastName = data.lastName;
        this.userPostData.Email = data.email;
        this.userPostData.GoogleID = data.id;
        this.userPostData.FBID = "";
        this.userPostData.LoginType = data.provider;
        this.userPostData.Image=data.photoUrl;
        debugger
        //this.getBase64ImageFromURL(data.photoUrl);
      
        //this.userPostData.Image=data.photoUrl.replace(/^data:image\/[a-z]+;base64,/,"");
        //this.userPostData.Image = "";
        this.userPostData.Mobile = "";
        this.userPostData.Address = "";
        this.userPostData.Country = "";
        this.userPostData.City = "";
        this.userPostData.EmailVerified = 0;
        this.userPostData.PWD = "";
        this.userPostData.Type = "";

      }
      else if(data.provider=="default") {
        data.provider = "D";

        this.userPostData.FirstName = "";
        this.userPostData.LastName = "";
        this.userPostData.Email = "";
        this.userPostData.FBID = "";
        this.userPostData.GoogleID = "";
        this.userPostData.LoginType = data.provider;
        this.userPostData.Image = data.photoUrl;

        this.userPostData.Mobile = "";
        this.userPostData.Address = "";
        this.userPostData.Country = "";
        this.userPostData.City = "";
        this.userPostData.EmailVerified = null;
        this.userPostData.PWD = "";
        this.userPostData.Type = "";
        debugger
    }
   
     debugger

    this.dataservice.registeruser(this.userPostData).subscribe(res => {
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      this.div.nativeElement.innerHTML =res["result"];
      this.router.navigateByUrl("customer/home");
       },
       errormsg => {
        
        console.log(errormsg["error"]["result"]);
        this.div.nativeElement.innerHTML=errormsg["error"]["result"];
        this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
           //this.router.navigateByUrl("customer/home");
  
       });

    }
    else{

      debugger
      
       this.messageService.add({severity:'success', summary:'Success Message', detail:'Your Email id is not registerd in Facebook'});
       

    }
    
  }

  getBase64ImageFromURL(url: string) {
    
    return Observable.create((observer: Observer<string>) => {
      debugger
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      debugger
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
          debugger
        };
        img.onerror = (err) => {
          observer.error(err);
        };
        debugger
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    
  }

  OnLogin() {  
    debugger
    this.submitted = true;
    this.ProgressSpinnerDlg=true;
    
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.lEmail.value,
      password: this.loginForm.controls.lPassword.value
    }
    this.userPostData.Email = this.loginForm.controls.lEmail.value;
    this.userPostData.PWD = this.loginForm.controls.lPassword.value;

       debugger

    this.dataservice.login(this.userPostData).subscribe(res => {
      debugger
      this.userdata=res['reFirstName'];
      localStorage.setItem('username',this.userdata);
      localStorage.setItem('Email',res['reEmail']);
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      this.show=false;
      this.div.nativeElement.innerHTML=res["result"];

      setTimeout(() => {
        this.router.navigate(['customer/shop-by-category']);
        //this.router.navigateByUrl("customer/shop-by-category");
    }, 9000); 
     
      this.Resetlog();
      //this.router.navigateByUrl("customer/customeraccount");
       },       
      //  error=>{
      //    this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
      //  });

       errormsg => {
        this.ProgressSpinnerDlg=false;
        console.log(errormsg["error"]["result"]);   
        this.show=false;     
        this.div.nativeElement.innerHTML=errormsg["error"]["result"];
        debugger
        //this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
           //this.router.navigateByUrl("customer/home");
  
       });

  }

  Forgot(){
    debugger
    this.userPostData.Email = this.ForgetForm.controls.FEmail.value;
    this.ProgressSpinnerDlg=true;
    if (this.ForgetForm.invalid) {
      return;
    }
    this.dataservice.forget(this.userPostData).subscribe(res => {
      debugger
      this.ProgressSpinnerDlg=false;
      //this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      this.show=false;
      this.Ferror.nativeElement.innerHTML=res["result"];
      this.ResetForgot();
      this.closeAddExpenseModal.nativeElement.click();
      alert(res["result"]);
      this.router.navigateByUrl("customer/home");
     
       },       
      //  error=>{
      //    this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
      //  });

       errormsg => {
        this.ProgressSpinnerDlg=false;
        console.log(errormsg["error"]["result"]);
        //this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
        this.show=false;
        this.Ferror.nativeElement.innerHTML=errormsg["error"]["result"];
           //this.router.navigateByUrl("customer/home");
  
       });
  }

  onKeyPress(event:any) {
    debugger
    this.show=true;
  }

  Resetlog() {
    this.loginForm.reset({
      'lEmail': '',
      'lPassword': ''
    })
  }

  ResetForgot(){
    this.ForgetForm.reset({
      'FEmail':''
      

    })
  }

}
