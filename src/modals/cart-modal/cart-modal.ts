import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartHandler } from 'src/providers/cart-handler';
import { ModalHandler } from 'src/providers/modal-handler';
import { OrderModal } from '../order-modal/order-modal';

@Component({
  selector: 'cart-modal',
  templateUrl: 'cart-modal.html',
  styleUrls: ['cart-modal.scss'],
})
export class CartModal {
  @Input() product: any;

  title: string = "ΚΑΛΑΘΙ";
  weightPriceText: string = "Τιμή κιλού: ";
  piecePriceText: string = "Τιμή τεμαχίου: ";
  totalText: string = "ΣΥΝΟΛΟ:  ";
  confirmButtonLabel: string = "Αγορά";
  exitButtonLabel: string = "Έξοδος";
  clearCartButtonLabel: string = "Άδειασμα καλ.";
  clearIcon: string = "trash-outline";
  emptyCartText: string = "Το καλαθι σας είναι άδειο";
  productsInCart = [];
  totalPrice: number;

  constructor(
    private modalCtrl: ModalController,
    private cartHandler: CartHandler,
    private modalHandler: ModalHandler,
    private router: Router
  ) {
    this.productsInCart = cartHandler.getProductsInCart();
    this.totalPrice = cartHandler.getTotalPrice();
  }

  openOrderModal() {
    this.dismiss();
    this.modalHandler.openOrderModal();
  }

  openProductPage(product) {
    this.dismiss();
    console.log(product)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        product: JSON.stringify(product)
      }
    };
    this.router.navigate(['/product'], navigationExtras)
  }

  clearCartContent() {
    this.cartHandler.deleteProducts();
    this.productsInCart = this.cartHandler.getProductsInCart();
  }

  removeProduct(index: number) {
    this.cartHandler.removeProduct(index);
    this.productsInCart = this.cartHandler.getProductsInCart();
    this.totalPrice = this.cartHandler.getTotalPrice();
  }

  dismiss() {
    this.modalHandler.closeCartModal();
  }

}