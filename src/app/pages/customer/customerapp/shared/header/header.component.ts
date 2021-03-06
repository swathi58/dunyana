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

  constructor(  public langShare: LangShareService,
    public translate: TranslateService,
    ) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.langShare.setTranslate(this.translate);
    this.translation();
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
}
