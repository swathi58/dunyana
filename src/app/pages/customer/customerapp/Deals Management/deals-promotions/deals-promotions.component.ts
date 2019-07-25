import { Component, OnInit } from '@angular/core';
import { DealsmanagementService } from '../../../services/dealsmanagement.service';
import { PagerService } from '../../../services/pager.service';

@Component({
  selector: 'app-deals-promotions',
  templateUrl: './deals-promotions.component.html',
  styleUrls: ['./deals-promotions.component.scss']
})
export class DealsPromotionsComponent implements OnInit {

  dealslist:any[]=[];
  totaldealsRecords:any;
  pager: any = {};
  pagedItems: any[]=[];
  constructor(private dealsservice:DealsmanagementService,private pagerService: PagerService) { }

  ngOnInit() {

    this.dealsservice.GetDealsList().subscribe(res=>{
     res.forEach(element => {
      element["image"]='data:image/png;base64,'+element["image"];
       this.dealslist.push(element);
     });
     this.setPage(1);
     // this.dealslist=res;
      console.log(this.dealslist.length);
     this.totaldealsRecords=this.dealslist.length;
    });
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }
    this.pager = this.pagerService.getPager(this.dealslist.length, page);

    this.pagedItems = this.dealslist.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
