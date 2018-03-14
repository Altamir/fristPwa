import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';



@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {

  public photos: any[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private db: AngularFireDatabase ) {

    let loading = this.loadingCtrl.create({
      content: "Carregando fotos..."
    });
    loading.present();
  

    db.list('/photos').valueChanges().subscribe(photos => {
      this.photos = photos.reverse();
      loading.dismiss();
  });




  }
}
