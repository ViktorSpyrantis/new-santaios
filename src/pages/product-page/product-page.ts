import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartHandler } from 'src/providers/cart-handler';
import { ProductsHandler } from 'src/providers/products-handler';

@Component({
  selector: 'product-page',
  templateUrl: 'product-page.html',
  styleUrls: ['product-page.scss'],
})
export class ProductPage {
  product: any;
  // {
  //   image: string,
  //   info: string,
  //   name: string,
  //   price: string,
  //   weight: number,
  //   quantity: number
  // };

  priceBasedOnWeight: boolean = true;
  kilos: number =  0.5;
  pieces: number = 1;
  attributeSelections: string[] = [];
  attributes: {
    name: string,
    options: string[]
  }[] = [];

  bg_img = "assets/icon/white_bg.svg";        // FIXME : change the image
  cartIcon = "assets/icon/shopping_cart.svg";
  buttonLabel = "Προσθήκη στο καλάθι";
  makeAChoiceText = "Κάντε μια επιλογή";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartHandler: CartHandler,
    private productsHandler: ProductsHandler
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.product = JSON.parse(params.product);
        
        // logics for weight or quantity based price
        for(let i = 0; i < this.product.categories.length; i++) {
          if (this.product.categories[i].name == "Τεμάχια") {
            this.priceBasedOnWeight = false;
            return;
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    // init values because their state will remain even after selecting another product
    this.kilos =  0.5;
    this.pieces = 1;
    this.attributeSelections = [];
    this.attributes = [];

    // add product attributes if they exist
    this.product.attributes.forEach(attr => {
      this.attributes.push({
        name: this.productsHandler.getAttributeName(attr.id),
        options: attr.options
      })
    });
  }

  calculatePrice(): number {
    return parseFloat(this.product.price.replace(',', '.')) * (this.priceBasedOnWeight ? this.kilos : this.pieces);
  }

  async addToCart() {
    let attributeText = '';
    this.attributeSelections.forEach(selection => {attributeText += selection})
    this.product.name = attributeText;
    console.log("PROD ", this.product.name);

    this.priceBasedOnWeight ? this.product.weight = this.kilos : this.product.quantity = this.pieces;
    this.cartHandler.addProductToCart(this.product)
    this.router.navigate(['/dashboard']);
  }

  selectAttribute(event, index) {
    this.attributeSelections[index] = event.detail.value;
  }

  checkIfAttributesAreSelected(): boolean {
    if(this.attributeSelections.length < this.attributes.length) return true;
    else return false;
  }

}