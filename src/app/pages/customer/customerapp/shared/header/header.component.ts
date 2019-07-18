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
  showDiv="";
  showlngDiv="";
  headerimg="assets/layout/images/header_logo.png";
  name: string;
  constructor(  public langShare: LangShareService,
    public translate: TranslateService,
    ) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.langShare.setTranslate(this.translate);
    this.translation();
    this.name=localStorage.getItem('username');
    debugger
  }
  toggleLang(lang) {
    this.lang = lang;
    this.translate.use(lang);
    this.langShare.setTranslate(this.translate);
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
