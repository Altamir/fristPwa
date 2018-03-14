import { Component, ViewChild } from '@angular/core';
import { Slides, NavParams, ViewController, LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';



@Component({
  selector: 'page-send-photo',
  templateUrl: 'send-photo.html'
})

export class SendPhotoPage {
  @ViewChild(Slides) slides: Slides;

  public user: string = '';
  public photos: AngularFireList<any>;
  public form: FormGroup;
  public location: string = '';
  public photo: string = '';
  public filter: string = 'original';
  public filters: string[] = [
    "original",
    "_1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "earlybird",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "maven",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow",
  ];

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private navparams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {

    this.photos = db.list('/photos');
    this.photo = this.navparams.get('photo');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email;
      }
    });

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      menssage: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.required
      ])]
    });

  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Enviando..." });
    loader.present();

    this.photos.push({
      user: this.user,
      image: this.photo,
      filter: this.filter,
      location: this.location,
      title: this.form.controls['title'].value,
      menssage: this.form.controls['menssage'].value,
      date: firebase.database.ServerValue.TIMESTAMP
    }).then( newData => {
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, err=>{
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Ops, algo deu errado',
        subTitle: 'Não foi possivel enviar sua postagem.',
        buttons: ['OK']
      });
      alert.present();
    })

  }

  changeFilter() {
    let currentIndex = this.slides.getActiveIndex();
    this.filter = this.filters[currentIndex];
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition((data) => {
          this.location = data.coords.latitude + ',' + data.coords.longitude;
        }, (err) => {
          let alert = this.alertCtrl.create({
            title: 'Ops, algo deu errado',
            subTitle: 'Não foi possivel obter sua localização.',
            buttons: ['OK']
          });
          alert.present();
        });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}