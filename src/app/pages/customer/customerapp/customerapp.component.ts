import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-customerapp',
  templateUrl: './customerapp.component.html',
  styleUrls: ['./customerapp.component.scss']
})
export class CustomerappComponent implements OnInit {

  constructor(private router :Router, private localStorage: LocalStorageService) { }

  ngOnInit() { 
    if (this.localStorage.get('Email') === null ) {
      this.router.navigateByUrl('customer/home');
    }
  }

}
