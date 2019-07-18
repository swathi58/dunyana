import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { RegistrationDto } from '../../../model/DTOs/RegistraionDto';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnInit {

  display: boolean = false;

  ProgressSpinnerDlg:boolean=false;

  registerdto:RegistrationDto={
    Id:0,
    FirstName:null,
    LastName:null,
    Email:null,
    Mobile:null,
    Address:null,
    Country:null,
    City:null,
    Image:null,
    LoginType:null,
    FBID:null,
    GoogleID:null,
    PWD:null,
    Type:null,
    EmailVerified:0
  }

profiledata=this.registerdto;
  constructor(private userservice:UsermanagementService,) { }

  ngOnInit() {
    this.ProgressSpinnerDlg=true;
   this.registerdto.Email=localStorage.getItem("Email");
    this.userservice.GetProfileInformation(this.registerdto).subscribe(res=>{
      this.profiledata.Image='data:image/png;base64,'+res["image"];
      this.profiledata.FirstName=res["firstName"];
      this.profiledata.LastName=res["lastName"];
      this.profiledata.City=res["city"];
      this.profiledata.Address=res["address"];
      this.profiledata.Country=res["country"];
      this.profiledata.Email=res["email"];
      this.profiledata.Id=res["id"];
      this.profiledata.Mobile=res["mobile"];
      this.ProgressSpinnerDlg=false;
     // console.log(this.profiledata["image"]);
    });
  }
  showDialog() {
    this.display = true;
}
onDialogClose(event) {
   this.display = event;
}

}
