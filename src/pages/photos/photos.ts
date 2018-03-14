import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShowMapPage } from '../show-map/show-map';



@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {

  public photos: any[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private db: AngularFireDatabase,
    private modalCtrl: ModalController) {

    let loading = this.loadingCtrl.create({
      content: "Carregando fotos..."
    });
    loading.present();


    db.list('/photos').valueChanges().subscribe(photos => {
      this.photos = photos.reverse();
      loading.dismiss();
    });

  }

  showMap(location) {
    let modal = this.modalCtrl.create(ShowMapPage, {
      location: location
    });
    modal.present();
  }
}
