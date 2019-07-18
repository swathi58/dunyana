import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  catname:string="";
  constructor(private router: ActivatedRoute) { 
    this.catname=this.router.snapshot.params['catname'];
  }

  ngOnInit() {

   }
}
