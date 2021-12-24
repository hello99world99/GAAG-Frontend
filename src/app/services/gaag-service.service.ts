import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class GaagServiceService {

  url = 'http://localhost:8088/api/';

  constructor(public http: HttpClient) { }

  public addApprenant(apprenant: any){
    console.log(apprenant);
    return this.http.post(this.url+'apprenant/ajouter', apprenant);
  }

  public modifierApprennants(id: any, dataA: any) {
    return this.http.put(this.url+'apprenant/modifer/'+id, dataA);
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
  public ajouterPromotion(promo : any) {
    console.log("Ajout Promotion....", promo);
    return this.http.post(this.url+'promotion/ajouter/', promo , {responseType:"text"});
  }
  public modifierPromotion(id: any, dataP: any){
    return this.http.put(this.url+'promotion/modifier/'+id, dataP);
  }
  public supprimerPromotion(id: any) {
    return this.http.delete(this.url+'promotion/supprimer/'+id);
  }

  public repartir(repartir: any, content: any) {
    return this.http.get(this.url+'groupe/repartir/promotion='+content+'&g='+repartir.value.g+'&a='+repartir.value.a);
  }

}
