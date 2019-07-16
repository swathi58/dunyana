import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider,AuthService,SocialLoginModule } from 'angularx-social-login';

//import{ToastrService}from 'ngx-toastr';
import {MessageService} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  headerlogo:string="assets/layout/images/glogo.png";

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

 

  constructor(private dataservice:UsermanagementService,private socialAuthService: AuthService,

    private router: Router,  private messageService: MessageService) {

      this.dataservice.sessionIn();

     }

  ngOnInit() {
  
  
  
}


  public socialSignIn(loginPlatform: string) {
    let socialPlatformProvider;
    if (loginPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
     else if (loginPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    else{
    
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
      this.router.navigateByUrl("customer/home");
       },
       error => {
        
           debugger
           this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
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
    debugger
  }

  OnLogin(email,password) {  
    this.userPostData.Email = email;
    this.userPostData.PWD = password;

  
       debugger

    this.dataservice.login(this.userPostData).subscribe(res => {
      debugger
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      //this.router.navigateByUrl("customer/home");
       },
       error => {
        
           debugger
           this.messageService.add({severity:'error', summary:'Error Message', detail:error["result"]});
           //this.router.navigateByUrl("customer/home");
           console.log(error);
  
       });
     
    
  }

  

}
