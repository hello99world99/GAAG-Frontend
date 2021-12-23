import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GaagServiceService {
  url = 'http://localhost:8088/api/';
  constructor(public http: HttpClient) { }

  addApprenant(apprenant: any){
    return this.http.post(this.url+'apprenant/ajouter', apprenant);
  }

  public modifierApprennants(id: any, data: any) {
    return this.http.put(this.url+'apprenant/modifer/'+id, data);
  }

  public listerApprennants(promo: any) {
    console.log(promo);
    return this.http.get(this.url+'apprenant/list/promo='+promo);
  }

  public supprimerApprennants(id: any) {
    return this.http.delete(this.url+'apprenant/supprimer/'+id);
  }

  public getPromotionList() {
    return this.http.get(this.url+'promotion/list');
  }
  public ajouterPromotion(promo: any) {
    return this.http.post(this.url+'promotion/ajouter/', promo);
  }
  public modifierPromotion(id: any, data: any){
    return this.http.put(this.url+'promotion/modifier/'+id, data);
  }
  public supprimerPromotion(id: any) {
    return this.http.delete(this.url+'promotion/supprimer/'+id);
  }

}
