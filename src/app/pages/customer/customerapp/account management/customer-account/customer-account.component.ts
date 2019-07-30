import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { RegistrationDto } from '../../../model/DTOs/RegistraionDto';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { OrdermanagementService } from '../../../services/ordermanagemet.service';
import { PagerService } from '../../../services/pager.service';
import { orderhistory } from '../../../model/OrderHistory';
@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnInit {

  display: boolean = false;
  editdialogdisplay: boolean = false;

  test: string = "test";
  parentMessage = "Start Shopping";

  ProgressSpinnerDlg: boolean = false;
  orderhistorylist: any[] = [];
  customerid: number;

  totalorderproductsRecords: any = 0;
  pager: any = {};
  pagedItems: any[] = [];
  filtereditems: any[] = [];
  totalproducts: Array<orderhistory> = [];

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
    // EncId:null,
    // NPWD:null,
    OTP: 0
  }


  profiledata = this.registerdto;
  constructor(private userservice: UsermanagementService, private localStorage: LocalStorageService, private router: Router,
    private orderservice: OrdermanagementService, private pagerService: PagerService) { }

  ngOnInit() {
    //this.ProgressSpinnerDlg=true;
    this.customerid = this.localStorage.get("customerid");
    this.GetProfiledata();
    //this.GetOrderHistory();
    this.GetOrderHistoryDetails();
  }
  showDialog() {
    this.display = true;
  }
  onDialogClose(event) {
    this.display = event;
  }


  showEditDialog() {
    this.editdialogdisplay = true;
  }

  onEditDialogClose(event) {
    this.editdialogdisplay = event;
    this.GetProfiledata();
  }
  GetProfiledata() {
    this.registerdto.Email = this.localStorage.get("Email");
    this.userservice.GetProfileInformation(this.registerdto).subscribe(res => {
      this.profiledata.Image = 'data:image/png;base64,' + res["image"];
      this.profiledata.FirstName = res["firstName"];
      this.profiledata.LastName = res["lastName"];
      this.profiledata.City = res["city"];
      this.profiledata.Address = res["address"];
      this.profiledata.Country = res["country"];
      this.profiledata.Email = res["email"];
      this.profiledata.Id = res["id"];
      this.profiledata.Mobile = res["mobile"];
      this.localStorage.set("PWD", res["pwd"]);
      this.localStorage.set("customerid", res["id"]);
      this.profiledata.PWD = res["pwd"];
      this.ProgressSpinnerDlg = false;
      // console.log(this.profiledata["image"]);
    });
  }

  GetOrderDetails(orderdetails) {
    this.router.navigateByUrl('customer/orderdetails/' + orderdetails);
  }

  GetOrderHistoryDetails() {
     if(this.orderservice.orderhistorydetailsdata.length>0)
     {
      this.orderhistorylist = this.orderservice.orderhistorydetailsdata;
     }
     else
     {
      this.orderservice.GetOrderHistory(this.customerid).subscribe(res => {
        this.orderhistorylist =res;
        this.orderservice.orderhistorydetailsdata=res;
        this.orderhistorylist.forEach(items => {
  
          this.totalorderproductsRecords = this.totalorderproductsRecords + items["orderDetails"].length;
  
        
          items["orderDetails"].forEach(prod => {
            let Orderproducthistory = new orderhistory();
  
            Orderproducthistory.orderid = items["orderNo"];
            //Orderproducthistory.soldby = items["merchant"]["name"];
            Orderproducthistory.orderplaced = items["orderDate"];
            Orderproducthistory.productname = prod["productName"];
            Orderproducthistory.productid = prod["id"];
            if(prod["productImage"]!="")
            {
              Orderproducthistory.productimage='data:image/png;base64,'+prod["productImage"];
            }     
            else
            {
              Orderproducthistory.productimage="assets/layout/images/cat_img_virtual.jpg";
            }
            this.totalproducts.push(Orderproducthistory);
            console.log(Orderproducthistory);
          });
          console.log(this.totalproducts);
  
        });
  
  
        this.setPage(1);
  
      })
     }

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalorderproductsRecords, page, 3);
    this.pagedItems = this.totalproducts.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }


}
