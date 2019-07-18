import { Component, OnInit } from '@angular/core';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  translationMessages: any;
  lang = 'en';
  showDiv="";
  showlngDiv="";
  useremail:string;
  islogin:boolean=false;

  logoimg:string;
  headerimg="assets/layout/images/header_logo.png";

  header_ar_img="assets/layout/images/header_logo_ar.png";
  englnfimg="assets/icons/english.png";
  spanlanimg="assets/icons/spanish.png";

  name: string;

  constructor(  public langShare: LangShareService,
    public translate: TranslateService,private localStorage: LocalStorageService
    ) { }

  ngOnInit() {
    this.logoimg=this.headerimg;
    /* this.translate.setDefaultLang('en');
    this.translate.use('en'); */
    if(this.localStorage.get('lang') != null){
      this.lang = this.localStorage.get('lang');
      this.translate.use(this.lang); 
      
    }
    this.langShare.setTranslate(this.translate);
    this.translation();


    if(localStorage.length>0)
    {
      if(localStorage.getItem("Email"))
      {
            this.useremail=localStorage.getItem("Email");
            this.islogin=true;
      }
    }

    this.name=localStorage.getItem('username');
    debugger

  }
  toggleLang(lang) {
    this.lang = lang;
    this.translate.use(lang);
    this.langShare.setTranslate(this.translate);
    if(lang=="en")
    {
       this.logoimg=this.headerimg;

    }
    else if(lang=="ar")
    {
      this.logoimg=this.header_ar_img;
    }

    this.showlngDiv="";
    this.showlngDiv="lang_container"; 
    this.localStorage.set('lang', lang);

  }
  translation() {
    this.langShare.translate$.subscribe(translate => {
      this.translate = translate;
      translate.get('Global').subscribe(data => {
        this.translationMessages = data;
      });
    });
  }
  displaysearch()
  {
    this.showDiv="showDiv";
  }
  closesearch()
  {
    this.showDiv="";
    this.showDiv="search_container";   
  }
  displaylang()
  {
this.showlngDiv="showDiv";
  }

}
