import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { category } from '../model/category';
import{BannerDto}from '../model/BannerDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,public router:Router) { }

  public CategoryList(): Observable<any[]> {
    return this.http.get<any[]>(
      environment.API_URL + 'Category/GetCategories'
    );
  }

  public Insertcategorylist(categorylist:category[]): Observable<category[]> {
    return this.http.post<category[]>(environment.API_URL + 'Category/InsertCategoryDetails', categorylist);
  }




  public getbanners(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL +'api/Banner');
  }
  public UpdateCategory(categorylist:category[]): Observable<category[]> {
    return this.http.post<category[]>(environment.API_URL + 'Category/UpdateCategorys', categorylist);
  }


  //banners

  public GetAllBanners(): Observable<any[]> {
    return this.http.get<any[]>(
      environment.API_URL + 'Banner/GetBanners'
    );
  }
}
