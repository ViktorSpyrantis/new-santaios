import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleDriveHandler, Files } from 'src/providers/googleDriveHandler';
import { ProductsHandler } from 'src/providers/products-handler';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
})
export class Dashboard {
  productsHaveBeenRetrieved: boolean = false;

  suggestedProductsTitle = "Προτεινόμενα  προϊόντα"
  suggestedProducts = [];
  weeklyOffersTitle = "Προσφορές εβδομάδος";
  weeklyOffers = [];

  bgImage: string = "assets/img/bg.png"
  logoBg: string = "assets/icon/logo_bg.svg"

  constructor(
    private router: Router,
    private productsHandler: ProductsHandler,
    private driveHandler: GoogleDriveHandler,
  ) {
    this.productsHandler.retrieveProducts().then(allProducts => {
      this.initLists(allProducts);
      this.productsHaveBeenRetrieved = true;
    }).catch(() => {
      this.initLists(this.productsHandler.getAllProducts());
      this.productsHaveBeenRetrieved = true;
    });

    // this is placed outside of the above then/catch clause in order not to take more time to load
    this.productsHandler.retrieveProductAttributes();
  }

  // loading problems if we do not use code below
  // ngOnInit() {
  //   setTimeout(() => {
  //     this.loadingComplete = true;
  //   }, 500);
  // }

  // ionViewDidEnter() {
  //   document.getElementById("logo-container").focus();
  // }

  // FIXME : DELET MAYBE
  // openCategory(categoryName: string) {
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       sheet: categoryName
  //     }
  //   };
  //   this.router.navigate(['/category'], navigationExtras)
  // }

  private initLists(products: []) {
    this.suggestedProducts = this.driveHandler.getProductsFromSheet(Files.SUGGESTED, products);
    this.weeklyOffers = this.driveHandler.getProductsFromSheet(Files.WEEK_OFFERS, products);
  }
}
