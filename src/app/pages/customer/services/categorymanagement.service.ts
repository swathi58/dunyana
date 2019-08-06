import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class categorymanagementService {

  constructor(private http: HttpClient,public router:Router,private localStorage: LocalStorageService) {}

  public GetMerchantbyCategoryId(CategoryID): Observable<any> {
    return this.http.get<any>(environment.API_URL + 'Merchant/GetMerchantCategory/'+CategoryID);
  }
  
  public CategoryList(): Observable<any[]> {
    return this.http.get<any[]>(
      environment.API_URL + 'Category/GetCategories'
    );
  }

  public GetAllBanners(): Observable<any[]> {
    return this.http.get<any[]>(
      environment.API_URL + 'Banner/GetBanners'
    );
  }

}
