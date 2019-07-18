import { Component, OnInit } from '@angular/core';
import { LangShareService } from 'src/app/shared/services/lang-share.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lang = 'en';
  imgfooter="assets/layout/images/footer_logo.png";
  constructor(public langShare: LangShareService,
    public translate: TranslateService,private localStorage: LocalStorageService) { }

  ngOnInit() {
    if(this.localStorage.get('lang') != null){
      this.lang = this.localStorage.get('lang'); 
      
    }
  }

}
