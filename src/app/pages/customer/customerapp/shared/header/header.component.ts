import { Component, OnInit } from '@angular/core';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  translationMessages: any;
  lang = 'en';
  currentlang="English";
  showDiv="";
  showlngDiv="";
  useremail:string;
  islogin:boolean=false;

  logoimg:string;
  headerimg="assets/layout/images/header_logo.png";
  header_ar_img="assets/layout/images/header_logo_ar.png";
  englnfimg="assets/icons/english.png";
  spanlanimg="assets/icons/spanish.png";
  constructor(  public langShare: LangShareService,
    public translate: TranslateService,
    ) { }

  ngOnInit() {
    this.logoimg=this.headerimg;
    this.translate.setDefaultLang('en');
    this.translate.use('en');
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
  }
  toggleLang(lang) {
    this.lang = lang;
    this.translate.use(lang);
    this.langShare.setTranslate(this.translate);
    if(lang=="en")
    {
       this.logoimg=this.headerimg;
       this.currentlang="English";

    }
    else if(lang=="ar")
    {
      this.logoimg=this.header_ar_img;
      this.currentlang="العربية";
    }
    this.showlngDiv="";
    this.showlngDiv="lang_container"; 
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
