import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductCategories } from 'src/providers/product-categories';

@Component({
  selector: 'category-list',
  templateUrl: 'category-list.html',
  styleUrls: ['category-list.scss']
})
export class CategoryList {

  categoryList = [];

  constructor(
    private productCategories: ProductCategories,
    private router: Router,
  ) {
    this.categoryList = this.productCategories.getCategories();
  }



  openCategory(id: string, title: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        sheet: id,
        title: title
      }
    };
    this.router.navigate(['/category'], navigationExtras)
  }
}