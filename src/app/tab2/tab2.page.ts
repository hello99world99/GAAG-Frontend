import { Component, OnInit } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Apprenant } from '../models/models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public promotions: any = [];
  public result: any = [];
  public apprenant = new Apprenant();

  constructor(
    private mService: GaagServiceService,
    private pickerCtrl: PickerController,
    ) {
      this.mService.getPromotionList().subscribe(
        (data: any) => {
          this.promotions = data;
          for (const promo of this.promotions) {
            this.result.push({text: promo.annee, value: promo});
          }
        }
      );
    }

  ngOnInit(): void {
  }

  public ajoutApprenant(data){
    this.mService.addApprenant(data.value);
    data.reset();
    this.apprenant.promotion = 'Promotion';
  }

  public ajoutPromotion(data: any){
    this.mService.ajouterPromotion(data);
  }

  public async showContent() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel',
        },
        {
          text: 'Fait',
        }
      ],
      columns: [
        {
          name: 'promotion',
          options: this.result
        }
      ],
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then( async data => {
      const col = await picker.getColumn('promotion');
      this.apprenant.promotion = col.options[col.selectedIndex].text;
    });
  }

}
