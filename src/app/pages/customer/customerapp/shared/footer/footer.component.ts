import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  display: boolean = false;
  imgfooter="assets/layout/images/footer_logo.png";
  constructor() { }

  ngOnInit() {
  }
  showDialog() {
    this.display = true;
}
onDialogClose(event) {
   this.display = event;
}
}
