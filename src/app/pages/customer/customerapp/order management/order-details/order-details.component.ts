import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdermanagementService } from '../../../services/ordermanagemet.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  customerid:number;
  productid:number;

  constructor(private router:ActivatedRoute,private orderservice:OrdermanagementService,private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.customerid=this.localStorage.get("customerid");
   this.productid=this.router.snapshot.params['ordid'];
   this.GetOrderHistoryDetails();

  }
  GetOrderHistoryDetails()
  {
    //this.orderservice.orderhistorydetailsdata
  }
}
