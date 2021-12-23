import { Component, OnInit } from '@angular/core';
import { GaagServiceService } from '../services/gaag-service.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public content = 'Promotion';
  public promotions: any;
  private formGroup: FormGroup;
  public form: FormGroup;
  public listPromos: any = [];
  public contenu = {};
  constructor(
    private service: GaagServiceService,
    private pickerCtrl: PickerController,
    private formBulder: FormBuilder,
    ) {

      this.form =  this.formBulder.group({
        formation: ['', [Validators.required, Validators.minLength(2)]],
        annee: ['', [Validators.required]],
      });
    }
    
  ngOnInit(): void {
    this.promotions =  this.getAllPromotions();
    this.formGroup =  this.formBulder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required,  Validators.pattern('^[0-9]+$')]]
    });


    console.log(this.contenu)
  }

  getAllPromotions(){
    this.service.getPromotionList().subscribe(
      (data)=>{
        this.promotions = data;
      }
    );
    for(let i=0; i<this.promotions.length; i++){
      this.contenu[i]['text'] = this.promotions[i].annee;
      this.listPromos.push(this.contenu[i]['text'])
   }
  }

  public ajoutApprenant(data: any){
    console.log(data.value);
  }

  public async showContent() {
    //console.log(this.promotions["annee"]);
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
          
            //{text: textAnnee, value: valueFormation}
            // {text: '2021', value: 'Formation sur dev web & mobile'},
            // {text: '2022', value: 'AWS cloud'},
            // {text: '2023', value: 'L\'avenir nous dira'},
            // {text: '2024', value: 'L\'avenir nous dira'}
           
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

  ajoutPromotion(form:FormGroup){
    console.log("hello");
    this.service.ajouterPromotion(this.form.value).subscribe(
      (data)=>{
        console.log("Ajout de la Promotion....");
      }
      
      );
  }

}
