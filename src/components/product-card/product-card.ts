import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html',
  styleUrls: ['product-card.scss'],
})
export class ProductCard {

  likeIcon: string = "assets/icon/heart.svg";
  weightText: string = "το κιλό";
  pieceText: string = "το τεμάχιο";
  shownPrice: string;
  priceBasedOnWeight: boolean;

  @Input() small: boolean;
  @Input() dayIndex?: number;
  // FIXME : DELET MAYBE IF USELESS
  // @Input() name: string;
  // @Input() image: string;
  // @Input() price: string;
  @Input() product: {
    image: string,
    info: string,
    name: string,
    price: string,
    weight: number,
    quantity: number
  };

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
    if (this.product && parseFloat(this.product.price) < 0) {
      this.shownPrice = ((parseFloat(this.product.price.replace(',', '.')) * -1) + ' €').replace('.', ',');
      this.priceBasedOnWeight = false;
    } else { 
      this.shownPrice = this.product.price + ' €';
      this.priceBasedOnWeight = true;
    }
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
