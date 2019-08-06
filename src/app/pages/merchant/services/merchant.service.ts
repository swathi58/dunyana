import { Injectable } from '@angular/core';
import { MerchantDto } from '../modal/MerchantDto';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import {RegistrationDto } from '../../customer/model/DTOs/RegistraionDto';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient,public router:Router,private localStorage: LocalStorageService) { }

  public merchentRegistration(merchantregistor: MerchantDto): Observable<MerchantDto> {
    return this.http.post<MerchantDto>(environment.API_URL + 'Merchant/InsertMerchant', merchantregistor);
  }

  public EmailVerification(registrationDto: RegistrationDto): Observable<RegistrationDto> { 
    return this.http.post<RegistrationDto>(environment.API_URL + 'Customer/EmailCheckValidation', registrationDto);
  }

  public GetCountries(): Observable<any> {
    return this.http.get<any>(environment.API_URL + 'LookupTypeValue/GetCountrylist');
  }

  public Getcategories(): Observable<any> {
    return this.http.get<any>(environment.API_URL + 'Category/GetCategories');
  }
}
