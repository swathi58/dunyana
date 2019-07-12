import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider,AuthService,SocialLoginModule } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userPostData:User={
    Email:"",
    FirstName:"",
    LastName:"",
    Mobile:"",
    Address:"",      
    Country:"",
    City:"",
    Image:"",
    EmailVerified:null,
    LoginType:"",
    FBID:"",
    GoogleID:"",
    PWD:"",
    Type:""



};
public responseData: any;


constructor(private dataservice:UsermanagementService,private socialAuthService: AuthService) {
    this.dataservice.sessionIn();
   }

ngOnInit() {
}

public socialSignIn(socialPlatform: string) {
  let socialPlatformProvider;
  if (socialPlatform === 'facebook') {
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  } else if (socialPlatform === 'google') {
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  } 

  this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
    console.log(socialPlatform + ' sign in data : ', (userData["firstName"]));

    // console.log(userData["SocialUser"]);
    // this.userPostData.firstname=data["SocialUser.firstName"];
    // console.log(this.userPostData.firstname);
  
    this.apiConnection(userData);

  });
}

apiConnection(data) {
  console.log(data);
  
  if(data.email!=undefined){

  if(data.provider=="FACEBOOK"){
      data.provider="F";

      this.userPostData.FirstName=data.first_name;
      this.userPostData.LastName=data.last_name;
      this.userPostData.Email=data.email;
      this.userPostData.FBID=data.id;
      this.userPostData.LoginType=data.provider;
      //this.userPostData.name=data.name;              
      this.userPostData.Image=data.photoUrl;   
      
      this.userPostData.Mobile="";
      this.userPostData.Address="";
      this.userPostData.Country="";
      this.userPostData.City="";
      this.userPostData.EmailVerified=null;
      this.userPostData.PWD="";
      this.userPostData.Type="";
      
  }
  else if(data.provider=="GOOGLE"){
    data.provider="G";

    this.userPostData.FirstName=data.firstName;
    this.userPostData.LastName=data.lastName;
    this.userPostData.Email=data.email;
    this.userPostData.FBID=data.id;
    this.userPostData.LoginType=data.provider;
    this.userPostData.Image=data.photoUrl;

    this.userPostData.Mobile="";
      this.userPostData.Address="";
      this.userPostData.Country="";
      this.userPostData.City="";
      this.userPostData.EmailVerified=null;
      this.userPostData.PWD="";
      this.userPostData.Type="";
   
  }
  else{
    data.provider="D";

    this.userPostData.FirstName=data.firstName;
    this.userPostData.LastName=data.lastName;
    this.userPostData.Email=data.email;
    this.userPostData.FBID=data.id;
    this.userPostData.LoginType=data.provider;
    this.userPostData.Image=data.photoUrl;

    this.userPostData.Mobile="";
      this.userPostData.Address="";
      this.userPostData.Country="";
      this.userPostData.City="";
      this.userPostData.EmailVerified=null;
      this.userPostData.PWD="";
      this.userPostData.Type="";
  }
 
   debugger
  this.dataservice.registeruser(this.userPostData).subscribe((data: any) => {
      
     })
  
    }
    else{
      alert('Please Register with your email id');
    }

  }
  
}
