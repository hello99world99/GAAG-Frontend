import { Component, OnInit } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  private formGroup : FormGroup;
  public content = 'Promotion';
  private promotions: any;
  constructor(
    private service: GaagServiceService,
    private pickerCtrl: PickerController,
    private formBulder: FormBuilder,

    ) {}
  ngOnInit(): void {

    this.promotions =  this.getAllPromotions();
    console.log(this.promotions);
    
    this.formGroup =  this.formBulder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required,  Validators.pattern('^[0-9]+$')]]
    })

  



  }

    

  
  getAllPromotions(){
    this.service.getPromotionList().subscribe(
      (data)=>{
        
        console.log(data);

        this.promotions = data
      }
    )
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
            // {text: '2021', value: 'Formation sur dev web & mobile'},
            // {text: '2022', value: 'AWS cloud'},
            // {text: '2023', value: 'L\'avenir nous dira'},
            // {text: '2024', value: 'L\'avenir nous dira'}
            // this.promotions
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
