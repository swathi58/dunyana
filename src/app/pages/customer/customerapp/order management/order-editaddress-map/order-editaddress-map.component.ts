import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-editaddress-map',
  templateUrl: './order-editaddress-map.component.html',
  styleUrls: ['./order-editaddress-map.component.scss']
})
export class OrderEditaddressMapComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  
  constructor() { }

  ngOnInit() {
  }
  onClose(){
    this.displayChange.emit(false);
  }
}
