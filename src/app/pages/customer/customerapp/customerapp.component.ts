import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerapp',
  templateUrl: './customerapp.component.html',
  styleUrls: ['./customerapp.component.scss']
})
export class CustomerappComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
      this.router.navigateByUrl('customer/home');
  }

}
