import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public content = 'Promotion';
  constructor(private pickerCtrl: PickerController) {}

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
          options: [
            {text: '2021', value: 'Formation sur dev web & mobile'},
            {text: '2022', value: 'AWS cloud'},
            {text: '2023', value: 'L\'avenir nous dira'},
            {text: '2024', value: 'L\'avenir nous dira'}
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
