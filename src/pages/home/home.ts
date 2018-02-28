import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import { LoginPage } from '../login/login';
import { PhotosPage } from '../photos/photos';
import { TakePicturePage } from '../take-picture/take-picture';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  public photosTab: any;
  public profileTab: any;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
    this.photosTab = PhotosPage;
    this.profileTab = PhotosPage;
  }

  showSendPhoto() {
    let modal = this.modalCtrl.create(TakePicturePage);
    modal.present();
  }

}
