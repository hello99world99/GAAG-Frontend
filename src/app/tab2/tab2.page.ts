import { Component, OnInit } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public content = 'Promotion';
  public promotions: any = [];
  public result: any = [];
  private formGroup: FormGroup;
  public form: FormGroup;
  public listPromos: any = [];
  public contenu = {};
  public index : any= 0;
  public promotionBody : any;
  public datepipe: DatePipe = new DatePipe('en-US');
  constructor(
    private mService: GaagServiceService,
    private pickerCtrl: PickerController,
    private formBulder: FormBuilder,
    private router: Router
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
  ngOnInit(): void {
    console.log(this.promotions);
    this.formGroup =  this.formBulder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required,  Validators.pattern('^[0-9]+$')]]
    });

    this.form =  this.formBulder.group({
      formation: ['', [Validators.required, Validators.minLength(2)]],
      annee: ['', [Validators.required]],
      
    });


    console.log(this.contenu)
  }

  public ajoutApprenant(data: any){
    data.value.promotion = this.content;
    this.mService.addApprenant(data.value).subscribe(
      (data)=>{
        
      }
    );
    this.router.navigateByUrl("/tabs/tab1");
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
    });
  }

  ajoutPromotion(){

    this.promotionBody = {
      annee: this.datepipe.transform(this.form.value.annee, 'dd/MM/YYYY'),
      formation : this.form.value.formation
    } 
    
    console.log(this.promotionBody);
    this.mService.ajouterPromotion(this.promotionBody).subscribe(
      
      (data)=>{
        this.presentToast();
        this.router.navigateByUrl("/tabs/tab1");
      }
      
      );
  }
  presentToast() {
    
  }

}
