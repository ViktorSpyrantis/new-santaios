import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartHandler } from 'src/providers/cart-handler';

@Component({
  selector: 'product-page',
  templateUrl: 'product-page.html',
  styleUrls: ['product-page.scss'],
})
export class ProductPage {
  /* commented code here exists for if price is only based on weight */

  product: {
    image: string,
    info: string,
    name: string,
    price: string,
    weight: number,
    quantity: number
  };

  priceBasedOnWeight: boolean;
  kilos: number =  0.5;
  pieces: number = 1;
  bg_img = "assets/icon/white_bg.svg";        // FIXME : change the image
  cartIcon = "assets/icon/shopping_cart.svg";
  buttonLabel = "Προσθήκη στο καλάθι";


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartHandler: CartHandler
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.product = JSON.parse(params.product);
        
        // logics for weight or quantity based price
        if (parseFloat(this.product.price.replace(',', '.')) > 0) {
          this.priceBasedOnWeight = true;
        } else {
          this.priceBasedOnWeight = false;
          this.product.price = '' + parseFloat(this.product.price.replace(',', '.')) * -1
        }
      }
    });
  }

  ionViewDidEnter() {
    this.kilos =  0.5;
  }

  calculatePrice(): number {
    return parseFloat(this.product.price.replace(',', '.')) * (this.priceBasedOnWeight ? this.kilos : this.pieces);
    // return parseFloat(this.product.price.replace(',', '.')) * this.kilos;
  }

  async addToCart() {
    this.priceBasedOnWeight ? this.product.weight = this.kilos : this.product.quantity = this.pieces;
    // this.product.weight = this.kilos;
    this.cartHandler.addProductToCart(this.product)
    this.router.navigate(['/dashboard']);
  }

}