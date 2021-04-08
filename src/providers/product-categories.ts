import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductSheet } from './productSheets';

@Injectable()
export class ProductCategories {

  private categoriesList = [
    {
      id: ProductSheet.BEEF,
      slug: 'beef',
      label: 'ΜΟΣΧΑΡΙΣΙΟ',
      page_title: 'Μοσχαρίσια κρέατα',
      icon: 'cow.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.PORK,
      slug: 'pork',
      label: 'ΧΟΙΡΙΝΟ',
      page_title: 'Χοιρινά κρέατα',
      icon: 'pig.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.CHICKEN,
      slug: 'paultry',
      label: 'ΚΟΤΟΠΟΥΛΟ',
      page_title: 'Κρέας κοτόπουλου',
      icon: 'chicken.svg',
      icon_by_height: false
    },
    {
      id: ProductSheet.LAMB,
      slug: 'lamb',
      label: 'ΑΜΝΟΕΡΙΦΙΑ',
      page_title: 'Αμνοερίφια',
      icon: 'sheep.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.PREPARATIONS,
      slug: 'sausage',
      label: 'ΠΑΡ/ΑΣΜΑΤΑ',
      page_title: 'Παρασκευάσματα',
      icon: 'kebab.svg',
      icon_by_height: false
    },
    {
      id: ProductSheet.DRY_AGED,
      slug: '',
      label: 'DRY AGED',
      page_title: 'Dry aged',
      icon: 'steak.svg',
      icon_by_height: true
    },
    {
      id: ProductSheet.PULSES,
      slug: "ospria",
      label: 'ΟΣΠΡΙΑ',
      page_title: 'Όσπρια',
      icon: '',
      icon_by_height: true
    },
    {
      id: ProductSheet.COLD_CUTS,
      slug: 'deli',
      label: 'ΑΛΛΑΝΤΙΚΑ',
      page_title: 'Αλλαντικά',
      icon: '',
      icon_by_height: true
    },
    {
      id: ProductSheet.PIECES,
      slug: 'temaxia',
      label: 'ΤΕΜΑΧΙΑ',
      page_title: 'Τεμάχια',
      icon: '',
      icon_by_height: true
    },
  ];
  constructor(public http: HttpClient) {
    this.categoriesList.forEach(cat => {
      cat.icon = 'assets/icon/' + cat.icon;
    })
  }

  public getCategories() {
    let fixedCategories = [];

    // return only categories with existing icon and slug
    this.categoriesList.forEach(category => {
      if (category.slug && category.icon != "assets/icon/") {
        fixedCategories.push(category)
      }
    })

    return fixedCategories;
  }
}