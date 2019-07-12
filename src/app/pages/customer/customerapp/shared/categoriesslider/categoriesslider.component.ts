import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-categoriesslider',
  templateUrl: './categoriesslider.component.html',
  styleUrls: ['./categoriesslider.component.scss']
})
export class CategoriessliderComponent implements OnInit {

   slideNo = 0;
  withAnim = true;
  resetAnim = true;

  @ViewChild('categoryCarousel') categoryCarousel: NguCarousel<any>;

  categorycarouselConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
    load: 5,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }

  categorycarouselItems = [{name:1,img:"assets/layout/images/cat_img_fash.jpg"}, {name:2,img:"assets/layout/images/cat_img_shoes.jpg"},
  {name:3,img:"assets/layout/images/cat_img_sports.jpg"},{name:4,img:"assets/layout/images/cat_img_beauty.jpg"},
  {name:5,img:"assets/layout/images/cat_img_virtual.jpg"},{name:6,img:"assets/layout/images/cat_img_fash.jpg"},
  {name:7,img:"assets/layout/images/cat_img_shoes.jpg"},{name:8,img:"assets/layout/images/cat_img_sports.jpg"},
  {name:9,img:"assets/layout/images/cat_img_beauty.jpg"}];

  constructor(private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  catmoveTo(slide)
  {
    this.categoryCarousel.moveTo(slide, !this.withAnim);
  }

}
