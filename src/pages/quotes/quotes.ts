import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  favorites = [];
  category: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get('category');
  }
  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
  }

  ionViewWillEnter() {
    this.getFavorites();
  }

  ionViewWillLeave() {
    this.navCtrl.popToRoot();
  }

  getFavorites() {
    const favStorage = localStorage.getItem('favorites');
    if (favStorage) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  }

  onClickFavorite(quote) {
    if (_.find(this.favorites, { id: quote.id })) {
      _.remove(this.favorites, (fav) => {
        return fav.id === quote.id;
      });
    } else {
      quote.category = this.category;
      this.favorites.push(quote);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(quote) {
    if (_.find(this.favorites, { id: quote.id })) {
      return true;
    }
    return false;
  }


}
