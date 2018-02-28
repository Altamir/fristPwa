import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-send-photo',
  templateUrl: 'send-photo.html'
})

export class SendPhotoPage {
  constructor(private viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  
}