import { Component } from '@angular/core';
import { CartHandler } from 'src/providers/cart-handler';
import { ModalHandler } from 'src/providers/modal-handler';

@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html',
  styleUrls: ['custom-header.scss']
})
export class CustomHeader {

  logo: string = "assets/icon/logo_no_letters.svg";
  cartIcon: string = "assets/icon/shopping_cart.svg"

  constructor(
    private cartHandler: CartHandler,
    private modalHandler: ModalHandler
  ) { }

  openCart() {
    this.modalHandler.openCartModal();
  }
}