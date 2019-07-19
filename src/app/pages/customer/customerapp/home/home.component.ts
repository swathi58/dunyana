import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fb_badge_img="assets/layout/images/fb_badge_img.jpg";
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  translationMessages: any;
  lang: string;

  name:any;

  @ViewChild('headerCarousel') headerCarousel: NguCarousel<any>;
 // @ViewChild('categoryCarousel') categoryCarousel: NguCarousel<any>;

  
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }

  
  // categorycarouselConfig: NguCarouselConfig = {
  //   grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
  //   load: 5,
  //   interval: {timing: 4000, initialDelay: 1000},
  //   loop: true,
  //   touch: true,
  //   velocity: 0.2
  // }

  headercarouselItems = [{name:1,img:"assets/layout/images/hero_banner.jpg"}, {name:2,img:"assets/layout/images/hero_banner.jpg"},
  {name:3,img:"assets/layout/images/hero_banner.jpg"},{name:4,img:"assets/layout/images/hero_banner.jpg"},
  {name:5,img:"assets/layout/images/hero_banner.jpg"},{name:6,img:"assets/layout/images/hero_banner.jpg"}];


  // categorycarouselItems = [{name:1,img:"assets/layout/images/cat_img_fash.jpg"}, {name:2,img:"assets/layout/images/cat_img_shoes.jpg"},
  // {name:3,img:"assets/layout/images/cat_img_sports.jpg"},{name:4,img:"assets/layout/images/cat_img_beauty.jpg"},
  // {name:5,img:"assets/layout/images/cat_img_virtual.jpg"},{name:6,img:"assets/layout/images/cat_img_fash.jpg"},
  // {name:7,img:"assets/layout/images/cat_img_shoes.jpg"},{name:8,img:"assets/layout/images/cat_img_sports.jpg"},
  // {name:9,img:"assets/layout/images/cat_img_beauty.jpg"}];


  constructor(private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer,
    public langShare: LangShareService,
    public translate: TranslateService,private localStorage: LocalStorageService) { 
    //this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  }


  ngOnInit() {

    if(this.localStorage.get('lang') != null){
      this.lang = this.localStorage.get('lang');
      this.translate.use(this.lang); 
      
    }
    this.langShare.setTranslate(this.translate);
    this.translation();

  this.name= this.localStorage.get('username');

  }
  translation() {
    this.langShare.translate$.subscribe(translate => {
      this.translate = translate;
      translate.get('Global').subscribe(data => {
        this.translationMessages = data;
      });
    });
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  

  moveTo(slide) {
    this.headerCarousel.moveTo(slide, !this.withAnim);
  }
  
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  // catmoveTo(slide)
  // {
  //   this.categoryCarousel.moveTo(slide, !this.withAnim);
  // }


}
