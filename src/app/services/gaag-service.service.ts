import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GaagServiceService {

  constructor() { }

  public addApprenant(apprenant){
    console.log(apprenant);
  }

  public getPromotionList(): any {
    throw new Error('Method not implemented.');
  }
}
