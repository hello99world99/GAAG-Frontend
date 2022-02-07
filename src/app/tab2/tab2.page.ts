import { Component, OnInit } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public content = 'Promotion';
  public promotions: any = [];
  public result: any = [];
  public apprenant: any;

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
    for (const promo of this.result) {
      if (promo.text === this.content){
        this.apprenant.promotion = promo.value;
      }
    }//toReverse.split('-').reverse().join('-');
    this.mService.addApprenant(this.apprenant);
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
      this.content = col.options[col.selectedIndex].text;
    });
  }

}
