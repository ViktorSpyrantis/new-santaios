import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductSheet } from './productSheets';

@Injectable()
export class ProductCategories {

  private categoriesList = [
    {
      id: ProductSheet.BEEF,
      greek: 'ΜΟΣΧΑΡΙΣΙΟ',
      page_title: 'Μοσχαρίσια κρέατα',
      icon: 'cow.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.PORK,
      greek: 'ΧΟΙΡΙΝΟ',
      page_title: 'Χοιρινά κρέατα',
      icon: 'pig.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.CHICKEN,
      greek: 'ΚΟΤΟΠΟΥΛΟ',
      page_title: 'Κρέας κοτόπουλου',
      icon: 'chicken.svg',
      icon_by_height: false
    },
    {
      id: ProductSheet.LAMB,
      greek: 'ΑΜΝΟΕΡΙΦΙΑ',
      page_title: 'Αμνοερίφια',
      icon: 'sheep.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.PREPARATIONS,
      greek: 'ΠΑΡ/ΑΣΜΑΤΑ',
      page_title: 'Παρασκευάσματα',
      icon: 'kebab.svg',
      icon_by_height: false
    },
    {
      id: ProductSheet.DRY_AGED,
      greek: 'DRY AGED',
      page_title: 'Dry aged',
      icon: 'steak.svg',
      icon_by_height: true
    }
  ];
  constructor(public http: HttpClient) { 
    this.categoriesList.forEach(cat => {
      cat.icon = 'assets/icon/' + cat.icon;
    })
  }

  public getCategories() {
    // FIXME : REMOVE THIS SHIT LATER
    return this.categoriesList;
  }
}