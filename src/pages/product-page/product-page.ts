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
  loadingComplete: boolean = false;

  // FIXME : vars here will change after variation / attribute refactoring of wordpress
  // attributeSelections: any[] = [];
  attributes: {
    name: string,
    options: string[]
  }[] = [];
  variationSelections: any[] = [];
  variations: {
    id: number,
    name: string
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

  ionViewWillEnter() {
    // init values because their state will remain even after selecting another product
    this.kilos =  0.5;
    this.pieces = 1;
    this.attributes = [];
    this.loadingComplete = false;

    // add product attributes if they exist and call the get variations API
    if (this.product.attributes.length > 0) {
      this.product.attributes.forEach(attr => {
        this.attributes.push({
          name: this.productsHandler.getAttributeName(attr.id),
          options: attr.options
        })
      });
      this.productsHandler.getProductVariations(this.product.id).then(vars => {
        vars.forEach(variation => {
          this.variations.push({
            id: variation.id,
            name: variation.attributes[0].option
          })
        });
        this.loadingComplete = true;
        console.log("Product variations:  ", this.variations)
      })
    } else {
      this.loadingComplete = true;
    }

  }

  calculatePrice(): number {
    return parseFloat(this.product.price.replace(',', '.')) * (this.priceBasedOnWeight ? this.kilos : this.pieces);
  }

  async addToCart() {
    // add variations to the product (for array of variations)
    this.variationSelections.forEach(selection => {
      for (let i = 0; i < this.variations.length; i++) {
        if (selection == this.variations[i].name) {
          console.log(this.variations[i].id);
          this.product.variations.push(this.variations[i].id);
        }
      }

    });

    this.product.weight = this.priceBasedOnWeight ? this.kilos : this.pieces;
    this.cartHandler.addProductToCart(this.product)
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 180);
  }

  selectVariation(event, index) {
    this.variationSelections[index] = event.detail.value;
    console.log(this.variationSelections)
  }

  checkIfVariationIsSelected(): boolean {
    if(this.variationSelections.length < this.attributes.length) return true;
    else return false;
  }

}