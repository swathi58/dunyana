import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';
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
    slide:1,
    velocity: 0.2
  }

  categorycarouselItems = [{name:'Fashion',img:"assets/layout/images/cat_img_fash.jpg"}, {name:'Shoes',img:"assets/layout/images/cat_img_shoes.jpg"},
  {name:'Sports',img:"assets/layout/images/cat_img_sports.jpg"},{name:'Beauty',img:"assets/layout/images/cat_img_beauty.jpg"},
  {name:'Virtual',img:"assets/layout/images/cat_img_virtual.jpg"},{name:'Fashion',img:"assets/layout/images/cat_img_fash.jpg"},
  {name:'Shoes',img:"assets/layout/images/cat_img_shoes.jpg"},{name:'Sports',img:"assets/layout/images/cat_img_sports.jpg"},
  {name:'Beauty',img:"assets/layout/images/cat_img_beauty.jpg"}];

  constructor(private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer, public langShare: LangShareService,
    public translate: TranslateService) { }

  ngOnInit() {
  }
  catmoveTo(slide)
  {
    this.categoryCarousel.moveTo(slide, !this.withAnim);
  }

}
