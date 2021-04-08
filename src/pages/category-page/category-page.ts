import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleDriveHandler } from 'src/providers/googleDriveHandler';
import { ProductsHandler } from 'src/providers/products-handler';

@Component({
  selector: 'category-page',
  templateUrl: 'category-page.html',
  styleUrls: ['category-page.scss'],
})
export class CategoryPage {
  
  title: string;
  private category: any;
  private columns: number = 2;
  private products = [];
  private rowList = [];
  private sheetNumber: number;
  private pageTitle: string;

  constructor(
    private route: ActivatedRoute, 
    private productsHandler: ProductsHandler,
    private driveHandler: GoogleDriveHandler
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        // FIXME : OLD CODE USING GOOGLE SHEETS, DELETE
        // this.sheetNumber = params.sheet;
        // this.products = this.driveHandler.getProducts(this.sheetNumber);

        this.pageTitle = params.title;
        this.products = this.productsHandler.getProductsByCategory(params.slug);

        console.log("PRODUCTS RETURNED: ", this.products);
      }
    });
  }

}

