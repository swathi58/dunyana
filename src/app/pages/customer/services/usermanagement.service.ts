import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registration } from '../model/registration';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(private http: HttpClient,public router:Router) {}

  public postDetails(Bank: registration): Observable<registration> {
    return this.http.post<registration>(environment.API_URL + `Bank`, Bank);
  }





  
  // mallesh api code
  
  async storeData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
    const newData = await this.getData();
    debugger
    return this.router.navigate(['/Home'], newData);
  }

  getData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  sessionIn() {
    let A;
    if (this.getData()) {
      A = this.router.navigate(['/Home'], this.getData());
    }
    return A;
  }

  sessionOut() {
    let A;
    if (!this.getData()) {
      A = this.router.navigate(['/Home']);
    }
    return A;
  }

  logOut() {
    localStorage.setItem('userData', '');
    localStorage.clear();
    return this.router.navigate(['/Home']);
  }


  registeruser(user:User){
    debugger
    const body : User = {
      Email:user.Email,
      FirstName:user.FirstName,
      LastName:user.LastName,      
      LoginType:user.LoginType,
      FBID:user.FBID,      
      Image:user.Image,
      Address:user.Address,
      Mobile:user.Mobile,
      Country:user.Country,
      City:user.City,
      EmailVerified:user.EmailVerified,
      GoogleID:user.GoogleID,
      PWD:user.PWD,
      Type:user.Type
      

    }

    var reqHeader = new HttpHeaders({'No-Auth':'True'});
      debugger
    return this.http.post(environment.API_URL+'CustomerRegistration/'+'InsertRegistrationDetails',body,{headers : reqHeader});
    
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      debugger
      this.http.post(environment.API_URL + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          //resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

}
