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

  display: boolean = false;

  customerid:number;
  productid:number=0;
  orderhistorylist: any[] = [];
  productitem:any[]=[];
  ProgressSpinnerDlg:boolean=false;
  productdetails:Productdetails={
    productimage:null,
    ordereddate:null,
    productcost:null,
    cardnumber:null,
    address:null,
    status:null,
    zip:null,
    country:null,
    productname:null
  }
  constructor(private router:ActivatedRoute,private orderservice:OrdermanagementService,private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.customerid=this.localStorage.get("customerid");
   this.productid=this.router.snapshot.params['ordid'];
   this.GetOrderHistoryDetails();

  }
  GetOrderHistoryDetails()
  {
    this.ProgressSpinnerDlg=true;
    this.orderhistorylist=this.orderservice.orderhistorydetailsdata;
    this.Fillproductdetails();
  }

  Fillproductdetails()
  {
    this.orderhistorylist.forEach(items => {
      this.productdetails.status=items["orderStatus"];
      this.productdetails.ordereddate=items["orderDate"];
      this.productdetails.address=items["orderAddress"][0]["line1"]+" , "+items["orderAddress"][0]["line2"]+" , "+items["orderAddress"][0]["city"]+" , "+items["orderAddress"][0]["state"]
      this.productdetails.zip=items["orderAddress"][0]["zip"];
      this.productdetails.country=items["orderAddress"][0]["country"];
      var prod:any[]=items["orderDetails"];
      let proitems=[];
      proitems=prod.filter(x=>x.id==this.productid);
      if(proitems.length>0)
      {
       this.productitem=proitems;
      }
    console.log(this.productitem);
    });

    this.productitem.forEach(item=>{
      if(item["productImage"]==="")
      {
        this.productdetails.productimage="assets/layout/images/no-image.png";
      }
      else
      {
        this.productdetails.productimage='data:image/png;base64,'+item["productImage"];
      }
      this.productdetails.productcost=Number.parseInt(item["unitCost"]);
      this.productdetails.productname=item["productName"];
    
    });
    this.ProgressSpinnerDlg=false;
  }
  onDialogClose(event) {
    this.display = event;
  }
  editaddressinmap()
  {
    this.display = true;
  }
}
