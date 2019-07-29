import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { RegistrationDto } from '../../../model/DTOs/RegistraionDto';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnInit {

  display: boolean = false;
  editdialogdisplay:boolean=false;

  test:string="test";
  parentMessage = "Start Shopping";

  ProgressSpinnerDlg:boolean=false;
  orderhistorylist:any[]=[];

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
    EmailVerified:0,
    Status:0,
   // EncId:null,
   // NPWD:null,
    OTP:0
  }

profiledata=this.registerdto;
  constructor(private userservice:UsermanagementService,private localStorage: LocalStorageService,private router:Router ) { }

  ngOnInit() {
    //this.ProgressSpinnerDlg=true;
   this.GetProfiledata();
   this.GetOrderHistory();
  }
  showDialog() {
    this.display = true;
}
onDialogClose(event) {
   this.display = event;
}


showEditDialog()
{
  this.editdialogdisplay=true;
}

onEditDialogClose(event) {
  this.editdialogdisplay = event;
  this.GetProfiledata();
}
GetProfiledata()
{
  this.registerdto.Email=this.localStorage.get("Email");
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
      this.localStorage.set("PWD",res["pwd"]);
      this.profiledata.PWD=res["pwd"];
      this.ProgressSpinnerDlg=false;
     // console.log(this.profiledata["image"]);
    });
}

GetOrderHistory()
{
  this.orderhistorylist=[
    {
      "productname":"SAR 123",
      "OrderID":"A1B2 – C3D4 – E5F6",
      "soldby":"Retailer Name",
      "MasterCard":"MasterCard **** 5100",
      "OrderPlaced":"July 12, 2019"
    },
    {
      "productname":"SAR 123",
      "OrderID":"A1B2 – C3D4 – E5F6",
      "soldby":"Retailer Name",
      "MasterCard":"MasterCard **** 5100",
      "OrderPlaced":"July 12, 2019"
    },
    {
      "productname":"SAR 123",
      "OrderID":"A1B2 – C3D4 – E5F6",
      "soldby":"Retailer Name",
      "MasterCard":"MasterCard **** 5100",
      "OrderPlaced":"July 12, 2019"
    }
  ]
}

GetOrderDetails(orderdetails)
{
  this.router.navigateByUrl('customer/orderdetails/' + orderdetails["OrderID"]);
}

}
