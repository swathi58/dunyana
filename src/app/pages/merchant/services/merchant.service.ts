import { Injectable } from '@angular/core';
import { MerchantDto } from '../modal/MerchantDto';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient,public router:Router,private localStorage: LocalStorageService) { }

  public merchentRegistration(merchantregistor: MerchantDto): Observable<MerchantDto> {
    return this.http.post<MerchantDto>(environment.API_URL + 'CustomerRegistration/InsertRegistrationDetails', merchantregistor);
  }

  public EmailVerification(merchantregistor: MerchantDto): Observable<MerchantDto> { 
    return this.http.post<MerchantDto>(environment.API_URL + 'Customer/AccountActivation', merchantregistor);
  }
}
