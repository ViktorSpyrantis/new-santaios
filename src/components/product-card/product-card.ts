import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html',
  styleUrls: ['product-card.scss'],
})
export class ProductCard {

  weightText: string = "το κιλό";
  pieceText: string = "το τεμ.";
  priceBasedOnWeight: boolean = true;

  @Input() small: boolean;
  @Input() dayIndex?: number;
  // FIXME : DELET MAYBE IF USELESS
  // @Input() name: string;
  // @Input() image: string;
  // @Input() price: string;
  @Input() product: any; 
  // {
  //   image: string,
  //   info: string,
  //   name: string,
  //   price: string,
  //   weight: number,
  //   quantity: number
  // };

  day: string;
  dayIndexMap = new Map([
    [0, "Καθημερινά"],
    [1, "Καθημερινά"],
    [2, "Δευτέρα"],
    [3, "Τρίτη"],
    [4, "Τετάρτη"],
    [5, "Πέμπτη"],
  ]); 


  constructor(
    private router: Router,
  ) { }

  ngOnInit() { 
    console.log(this.product)
    // if (this.product) {
      // this.shownPrice = (parseFloat(this.product.price.replace(',', '.')) + ' €').replace('.', ',');
      for(let i = 0; i < this.product.categories.length; i++) {
        if (this.product.categories[i].name == "Τεμάχια") {
          this.priceBasedOnWeight = false;
          return;
        }
      }
    // }
  }

  openProduct() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        product: JSON.stringify(this.product)
        // name: this.product.name,
        // image: this.product.image,
        // price: this.product.price
      }
    };
    this.router.navigate(['/product'], navigationExtras)
  }
}
