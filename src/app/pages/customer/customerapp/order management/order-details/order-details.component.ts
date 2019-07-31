import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdermanagementService } from '../../../services/ordermanagemet.service';
import { LocalStorageService } from 'angular-web-storage';
import { Productdetails } from '../../../model/ProductDetails';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  customerid:number;
  productid:number=0;
  orderhistorylist: any[] = [];
  productdetails:Productdetails={
    productimage:null,
    ordereddate:null,
    productcost:null,
    cardnumber:null,
    address:null,
    status:null
  }
  constructor(private router:ActivatedRoute,private orderservice:OrdermanagementService,private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.customerid=this.localStorage.get("customerid");
   this.productid=this.router.snapshot.params['ordid'];
   this.GetOrderHistoryDetails();

  }
  GetOrderHistoryDetails()
  {
    this.orderhistorylist=this.orderservice.orderhistorydetailsdata;
    this.Fillproductdetails();
  }

  Fillproductdetails()
  {
    this.orderhistorylist.forEach(items => {
      
      var prod:any[]=items["orderDetails"];
     console.log(prod.filter(x=>x.id==this.productid));
    });
  }
}
