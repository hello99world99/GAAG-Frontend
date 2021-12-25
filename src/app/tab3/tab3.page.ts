import { Component } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public apprenantList: any;
  public content = 'Promotion';
  public promotions: any = [];
  public result = [];
  constructor(
    private mService: GaagServiceService,
    private pickerCtrl: PickerController
    ) {
      this.mService.getPromotionList().subscribe(
        (data: any) => {
          this.promotions = data;
          for (const promo of this.promotions) {
            this.result.push({text: promo.annee.split('-').reverse().join('-'), value: promo.formation});
          }
        }
      );
  }

  public deleteApprenant(apprenant: any){
    this.mService.supprimerApprennants(apprenant.id);
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
      this.content = col.options[col.selectedIndex].text;
      this.mService.listerApprennants(this.content).subscribe(
        (result: any) => {
          this.apprenantList = result;
        }
      );
    });
  }

}
