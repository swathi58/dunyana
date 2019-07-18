import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-categoriesslider',
  templateUrl: './categoriesslider.component.html',
  styleUrls: ['./categoriesslider.component.scss']
})
export class CategoriessliderComponent implements OnInit {

   slideNo = 0;
  withAnim = true;
  resetAnim = true;
  items: any[];



  @ViewChild('categoryCarousel') categoryCarousel: NguCarousel<any>;

  categorycarouselConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
    load: 5,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    slide:1,
    velocity: 0.2
  }

  categorycarouselItems = [{name:"Fashion",img:"assets/layout/images/cat_img_fash.jpg"}, {name:"Shoes",img:"assets/layout/images/cat_img_shoes.jpg"},
  {name:"Sports & Fitness",img:"assets/layout/images/cat_img_sports.jpg"},{name:"Accessories & Beauty",img:"assets/layout/images/cat_img_beauty.jpg"},
  {name:"Virtual Mall",img:"assets/layout/images/cat_img_virtual.jpg"},{name:"Fashion",img:"assets/layout/images/cat_img_fash.jpg"},
  {name:"Shoes",img:"assets/layout/images/cat_img_shoes.jpg"},{name:"Sports & Fitness",img:"assets/layout/images/cat_img_sports.jpg"},
  {name:"Accessories & Beauty",img:"assets/layout/images/cat_img_beauty.jpg"}];

  constructor(private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer,private route:Router) {

    this.items = [
      {vin: 'Fashion', brand: 'cat_img_beauty'},
      {vin: 'Shoes', brand: 'cat_img_fash'},
      {vin: 'Sports Fitness', brand: 'cat_img_shoes'},
      {vin: 'Accessories & Beauty',  brand: 'cat_img_sports'},
      {vin: 'Virtual Mall',  brand: 'cat_img_virtual'},
      {vin: 'Fashion', brand: 'cat_img_beauty'},
      {vin: 'Shoes', brand: 'cat_img_fash'},
      {vin: 'Sports Fitness',  brand: 'cat_img_shoes'},
      {vin: 'Accessories & Beauty',brand: 'cat_img_sports'},
      {vin: 'Virtual Mall', brand: 'cat_img_virtual'},
      {vin: 'Fashion',  brand: 'cat_img_beauty'},
      {vin: 'Shoes',  brand: 'cat_img_fash'},
      {vin: 'Sports Fitness',  brand: 'cat_img_shoes'},
      {vin: 'Accessories & Beauty', brand: 'cat_img_sports'},
      {vin: 'Virtual Mall',  brand: 'cat_img_virtual'}
  ];

   }

  ngOnInit() {
  }
  catmoveTo(slide)
  {
    this.categoryCarousel.moveTo(slide, !this.withAnim);
  }

  navigatetocategory(catname)
  {
    this.route.navigateByUrl('customer/category/'+catname);
  }
}
