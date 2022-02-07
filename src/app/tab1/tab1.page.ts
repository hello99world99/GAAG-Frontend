import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Repartition } from '../models/models';
import { GaagServiceService } from '../services/gaag-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public repartition = new Repartition();
  public promotions: any = [];
  public groupeListe: any;
  public result = [];
  constructor(
    private pickerCtrl: PickerController,
    private mService: GaagServiceService
    ) {
    this.mService.getPromotionList().subscribe(
      (data: any) => {
        this.promotions = data;
        for (const promo of this.promotions) {
          this.result.push({text: promo.annee, value: promo.formation});
        }
      }
    );
  }

  public repartir(repartir: any){
    this.mService.repartir(repartir.value, this.repartition.promotion).subscribe(
      (data: any) => {
        this.groupeListe = data;
      }
    );
  }

  public async showContent() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
        },
        {
          text: 'Done',
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
      this.repartition.promotion = col.options[col.selectedIndex].text;
    });
  }

}
