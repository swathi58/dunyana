import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';
import { CategoryService } from 'src/app/pages/admin/services/category.service';
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
  parentMessage = "Shop By Category";
  translationMessages: any;
  lang: string;

  name:any;
  headercarouselItems:any[]=[];
  
  @ViewChild('headerCarousel') headerCarousel: NguCarousel<any>;
 // @ViewChild('categoryCarousel') categoryCarousel: NguCarousel<any>;

  
 carouselConfig: NguCarouselConfig = {
  grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
  load: 1,
  interval: {timing: 4000, initialDelay: 1000},
  loop: true,
  touch: true,
  velocity: 0.2,
  point: {
    visible: true,
    hideOnSingleSlide: true
  }
}

  


  constructor(private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer,
    public langShare: LangShareService,
    public translate: TranslateService,private localStorage: LocalStorageService,
    private catgservice:CategoryService) { 
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
  this.BannersList();
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
 BannersList()
 {
  this.catgservice.GetAllBanners().subscribe(res=>{
    res.forEach(item=>{
      item["image"]='data:image/png;base64,'+ item["image"];
      this.headercarouselItems.push(item);
    });
    console.log(this.headercarouselItems);
  });

  //   this.headercarouselItems = [{name:1,image:"assets/layout/images/hero_banner.jpg"}, {name:2,image:"assets/layout/images/hero_banner.jpg"},
  // {name:3,image:"assets/layout/images/hero_banner.jpg"},{name:4,image:"assets/layout/images/hero_banner.jpg"},
  // {name:5,image:"assets/layout/images/hero_banner.jpg"},{name:6,image:"assets/layout/images/hero_banner.jpg"}];
 }

}
