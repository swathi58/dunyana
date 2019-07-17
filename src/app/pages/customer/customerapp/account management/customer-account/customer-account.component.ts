import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnInit {

  display: boolean = false;

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
