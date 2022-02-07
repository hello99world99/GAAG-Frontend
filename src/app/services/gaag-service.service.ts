import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apprenant } from '../models/models';
@Injectable({
  providedIn: 'root'
})

export class GaagServiceService {

  url = 'http://localhost:8088/api/';

  constructor(public http: HttpClient) { }

  public async addApprenant(data: any){
    const apprenant = data;
    await this.getPromotionByDate(data.promotion).subscribe(
      (promotion) => {
        apprenant.promotion = promotion;
        this.http.post<Apprenant>(this.url+'apprenant/ajouter', apprenant);
      }
    );
  }

  public modifierApprennants(id: any, dataA: any) {
    return this.http.put(this.url+'apprenant/modifer/'+id, dataA);
  }

  public listerApprennants(promo: any) {
    return this.http.get(this.url+'apprenant/list/promo='+promo);
  }

  public supprimerApprennants(id: any) {
    return this.http.delete(this.url+'apprenant/supprimer/'+id);
  }

  public getPromotionByDate(promotion: any) {
    return this.http.get(this.url+'promotion/get/date='+promotion);
  }

  public getPromotionList() {
    return this.http.get(this.url+'promotion/list');
  }

  public ajouterPromotion(promo: any) {
    console.log(promo.value);
    this.http.post(this.url+'promotion/ajouter', promo.value).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

  public modifierPromotion(id: any, dataP: any){
    return this.http.put(this.url+'promotion/modifier/'+id, dataP);
  }

  public supprimerPromotion(id: any) {
    return this.http.delete(this.url+'promotion/supprimer/'+id);
  }

  public repartir(repartir: any, content: any) {
    return this.http.get(
      this.url+'groupe/repartir/promotion='+content
      +'&nbrGroups='+repartir.nbrGroups
      +'&nbrPerson='+repartir.nbrPerson+'&trie='+repartir.trie
      +'&method='+repartir.method
      );
  }

}
