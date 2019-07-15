import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationDto } from '../../model/DTOs/RegistraionDto';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-emailverification-success',
  templateUrl: './emailverification-success.component.html',
  styleUrls: ['./emailverification-success.component.scss']
})
export class EmailverificationSuccessComponent implements OnInit {

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
 
  constructor( private route: ActivatedRoute,private userservice:UsermanagementService) { }

  ngOnInit() {
   console.log(this.route.snapshot.params['emailid']);
   this.registerdto.Email=this.route.snapshot.params['emailid'];
   this.registerdto.EmailVerified=1;
   this.userservice.EmailVerificationUpdate( this.registerdto).subscribe(res=>{
     console.log(res);
   });
  }

}
