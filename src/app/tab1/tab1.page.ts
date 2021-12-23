import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { GaagServiceService } from '../services/gaag-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public content = 'Promotion';
  public promotions: any = [];
  public groupeListe: any;
  public result = [];
  data: any = {};
  constructor(
    private pickerCtrl: PickerController,
    private mService: GaagServiceService
    ) {
    this.mService.getPromotionList().subscribe(
      (data: any) => {
        this.promotions = data;
        for (const promo of this.promotions) {
          const text = promo.annee;
          const value = promo.formation;
          //this.result.push({text: text, value: value});
        }
      }
    );
  }

  public repartir(repartir: any){
    console.log(repartir.value);
    this.mService.repartir(repartir, this.content).subscribe(
      (data: any) => {
        this.groupeListe = data;
      }
    );
  }

  public async showContent() {
    console.log(this.promotions);
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
          options: [
            {text: '02-05-2021', value: 'Formation sur dev web & mobile'},
            {text: '02-05-2022', value: 'AWS cloud'},
          ]
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
