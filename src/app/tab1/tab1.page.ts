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
            {text: 'Python', value: 'Python language'},
            {text: 'Java', value: 'Java language'},
            {text: 'JavaScript', value: 'JavaScript language'},
            {text: 'TypeScript', value: 'TypeScript language'}
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
