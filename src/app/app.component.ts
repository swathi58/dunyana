import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LangShareService } from './shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dunyana.web';
  translationMessages: any;
  lang = 'en';
  
  constructor(private router: Router,
    public langShare: LangShareService,
    public translate: TranslateService) {

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
  async ngOnInit() {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.langShare.setTranslate(this.translate);
      this.translation();
  }
}
