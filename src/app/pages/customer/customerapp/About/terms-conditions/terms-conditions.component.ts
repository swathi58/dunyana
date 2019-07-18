import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  
  constructor() { }

  ngOnInit() {
  }
  onClose(){
    this.displayChange.emit(false);
  }

}
