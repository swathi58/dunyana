import { Component, OnInit } from '@angular/core';
import { categorymanagementService } from '../../services/categorymanagement.service';
import { ActivatedRoute } from '@angular/router';
import { NguCarouselConfig } from '@ngu/carousel';
import { CategoryService } from 'src/app/pages/admin/services/category.service';
import { CategoryWiseMerchants } from '../../model/CategoryWiseMerchants';
import { PagerService } from '../../services/pager.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  headercarouselItems: any = [];
  CategoryID: number;
  ProgressSpinnerDlg: boolean = false;
  categorywisemerchants: Array<CategoryWiseMerchants> = [];
  pager: any = {};
  totalorderproductsRecords:number=0;
  pagedItems: Array<CategoryWiseMerchants> = [];
  alphabetpaging = [ '#','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  filtereditems:any[]=[];
  isempty:boolean=false;
  // merchants:CategoryWiseMerchants={
  //   categoryid:0,
  //   categoryname:null,

  // }

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  }
  constructor(private categoryservice: categorymanagementService, private router: ActivatedRoute,
    private catgservice: CategoryService,private pagerService:PagerService) { }

  ngOnInit() {
    this.CategoryID = this.router.snapshot.params["catid"];

    this.router.params.subscribe(params => {
      this.CategoryID = params['catid'];
      this.GetMerchantByCategoryID();
    });
    this.BannersList();
    //this.GetMerchantByCategoryID();
  }
  GetMerchantByCategoryID() {
    this.ProgressSpinnerDlg = true;
    this.categorywisemerchants = [];
    this.categoryservice.GetMerchantbyCategoryId(this.CategoryID).subscribe(res => {
      res.forEach(item => {
        let merchant = new CategoryWiseMerchants();
        merchant.categoryid = item["categoryID"];
        merchant.merchantid = item["merchant"]["id"];
        if (item["merchant"]["profileImage"] == "") {
          merchant.merchantimage = "assets/layout/images/brand-img1.jpg";
        }
        else {
          merchant.merchantimage = 'data:image/png;base64,' + item["merchant"]["profileImage"];
        }

        merchant.merchantname = item["merchant"]["name"];
        this.categorywisemerchants.push(merchant);
        
      });

     
      this.totalorderproductsRecords=this.categorywisemerchants.length;
      //this.setPage(1);
      this.Filterbyalphabet('');
    });

  }
  BannersList() {
    this.catgservice.GetAllBanners().subscribe(res => {
      res.forEach(item => {
        item["image"] = 'data:image/png;base64,' + item["image"];
        this.headercarouselItems.push(item);
      });
    });

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.filtereditems.length, page, 4);
    this.pagedItems = this.filtereditems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  
Filterbyalphabet(char)
{
 this.filtereditems=this.filter(this.categorywisemerchants,1,char);
 if(this.filtereditems.length>0)
 {
  this.setPage(1);
  this.isempty=true;
 }
 else
 {
  this.pagedItems=[];
  this.pager={};
  this.isempty=false;
 }
 this.ProgressSpinnerDlg = false;
}
filter(merchantsdata, index, letter) {
  if(letter==='' || letter==='#')
  {
    return merchantsdata;
  }
  else
  {
   var filteredNames = merchantsdata.filter( 
     res=>{
       if(res["merchantname"][0].toLowerCase()===letter.toLowerCase())
       {
       return res;
       }
      }
   );
   return filteredNames;
  }
}
}
