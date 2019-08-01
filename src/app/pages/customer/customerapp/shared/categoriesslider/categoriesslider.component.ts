import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'src/app/pages/admin/services/category.service';
@Component({
  selector: 'app-categoriesslider',
  templateUrl: './categoriesslider.component.html',
  styleUrls: ['./categoriesslider.component.scss']
})
export class CategoriessliderComponent implements OnInit {

  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  items: any[] = [];
  Shopbycategory:string="Shop By Category";
  @Input() childMessage: string;

  @ViewChild('categoryCarousel') categoryCarousel: NguCarousel<any>;

  categorycarouselConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
    load: 5,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    slide: 1,
    velocity: 0.2
  }

  categorycarouselItems = [{ name: "Fashion", img: "assets/layout/images/cat_img_fash.jpg" }, { name: "Shoes", img: "assets/layout/images/cat_img_shoes.jpg" },
  { name: "Sports & Fitness", img: "assets/layout/images/cat_img_sports.jpg" }, { name: "Accessories & Beauty", img: "assets/layout/images/cat_img_beauty.jpg" },
  { name: "Virtual Mall", img: "assets/layout/images/cat_img_virtual.jpg" }, { name: "Fashion", img: "assets/layout/images/cat_img_fash.jpg" },
  { name: "Shoes", img: "assets/layout/images/cat_img_shoes.jpg" }, { name: "Sports & Fitness", img: "assets/layout/images/cat_img_sports.jpg" },
  { name: "Accessories & Beauty", img: "assets/layout/images/cat_img_beauty.jpg" }];

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private route: Router,
    public langShare: LangShareService,
    public translate: TranslateService, private catgservice: CategoryService) {
  }

  ngOnInit() {
    this.LoadCategories();
  }
  catmoveTo(slide) {
    this.categoryCarousel.moveTo(slide, !this.withAnim);
  }

  navigatetocategory(catid) {
    this.route.navigateByUrl('customer/shopping/' + catid);
  }
  LoadCategories() {
    this.catgservice.CategoryList().subscribe(res => {
      res.forEach(img => {
        img["image"] = 'data:image/png;base64,' + img["image"]
        this.items.push(img);
      });
    });

  }
}
