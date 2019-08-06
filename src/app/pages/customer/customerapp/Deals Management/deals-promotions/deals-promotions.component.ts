import { Component, OnInit } from '@angular/core';
import { DealsmanagementService } from '../../../services/dealsmanagement.service';
import { PagerService } from '../../../services/pager.service';
import { Pipe, PipeTransform } from '@angular/core';

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
  filtereditems:any[]=[];
  isempty:boolean=true;
  alphabetpaging = [ '#','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  constructor(private dealsservice:DealsmanagementService,private pagerService: PagerService) { }

  ngOnInit() {

    this.dealsservice.GetDealsList().subscribe(res=>{
     res.forEach(element => {
      element["image"]='data:image/png;base64,'+element["image"];
       this.dealslist.push(element);
     
     });
   
     //this.setPage(1);
    
     // this.dealslist=res;
     this.Filterbyalphabet('');
     this.totaldealsRecords=this.dealslist.length;
    });

   
  }

 filter(dealsdata, index, letter) {
   if(letter==='' || letter==='#')
   {
     return dealsdata;
   }
   else
   {
    var filteredNames = dealsdata.filter( 
      res=>{
      
        if(res["name"][0]===letter)
        {
        return res;
        }
       }
    );
    return filteredNames;
   }
}

Filterbyalphabet(char)
{

 this.filtereditems=this.filter(this.dealslist,1,char);
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

}
setPage(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
      return;
  }
  this.pager = this.pagerService.getPager(this.filtereditems.length, page,4);
  this.pagedItems = this.filtereditems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
