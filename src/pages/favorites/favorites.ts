import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as _ from 'lodash';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  favorites = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ionViewDidEnter() {
    this.getFavorites();
  }

  getFavorites() {
    const favStorage = localStorage.getItem('favorites');
    if (favStorage) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  }

  onClickFavorite(quote) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure, you want it to unfavorite?',
      message: 'This will remove it from your favorite list, but will be available  in library!',
      buttons: [
        {
          text: 'Not Now',
          handler: () => {
            // do nothing
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.unFavorite(quote);
          }
        }
      ]
    });
    confirm.present();

  }

  unFavorite(quote) {
    _.remove(this.favorites, (fav) => {
      return fav.id === quote.id;
    });
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

}
