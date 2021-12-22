import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GaagServiceService {
  url = 'http://localhost:8088/api/';
  constructor(public http: HttpClient) { }




  addApprenant(apprenant: any){
    
    return this.http.post(this.url+"apprenant/ajouter", apprenant);
  }

  public getPromotionList() {
    return this.http.get(this.url+"promotion/list");
  }


}
