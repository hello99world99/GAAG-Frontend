import { Component, OnInit } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  constructor(
    private mService: GaagServiceService,
    private pickerCtrl: PickerController,
    private formBulder: FormBuilder,
<<<<<<< HEAD
    public toastController : ToastController,
    public router: Router
    ) {



     for (var index in this.promotions) {
      console.log(index); // prints indexes: 0, 1, 2, 3
    
      console.log(this.promotions[index]); // prints elements: 10, 20, 30, 40
    }

      this.form =  this.formBulder.group({
        formation: ['', [Validators.required, Validators.minLength(2)]],
        annee: ['', [Validators.required]],
      });
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Promotion ajouter avec succes.',
        duration: 2000
      
      });
      toast.present();
    }
    
  ngOnInit(): void {
    this.promotions =  this.getAllPromotions();
=======
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
>>>>>>> b8d90a26bf7c8e61ed5a3a0cee1bcbe7b19d47e2
    this.formGroup =  this.formBulder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required,  Validators.pattern('^[0-9]+$')]]
    });


    console.log(this.contenu)
  }

<<<<<<< HEAD
  getAllPromotions(){
    this.service.getPromotionList().subscribe(
      (data)=>{
        this.promotions = data;
        console.log(this.promotions)
      }
    );

  }

  public ajoutApprenant(data: any){
    console.log(data.value);
=======
  public ajoutApprenant(data: any){
    data.value.promotion = this.content;
    this.mService.addApprenant(data.value);
  }
>>>>>>> b8d90a26bf7c8e61ed5a3a0cee1bcbe7b19d47e2

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
<<<<<<< HEAD
          options: [
          

            //{text: this.promotions[this.index].annee, value: "hello"}
            {text: '2021', value: 'Formation sur dev web & mobile'},
            {text: '2022', value: 'AWS cloud'},
            {text: '2023', value: 'L\'avenir nous dira'},
            {text: '2024', value: 'L\'avenir nous dira'}
           
          ]
=======
          options: this.result
>>>>>>> b8d90a26bf7c8e61ed5a3a0cee1bcbe7b19d47e2
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

  ajoutPromotion(form:FormGroup){
    console.log("hello");
    this.service.ajouterPromotion(this.form.value).subscribe(
      (data)=>{
        console.log("Ajout de la Promotion....");
        this.presentToast();
        this.router.navigateByUrl("/tabs/tab1");
      }
      
      );
  }

}
