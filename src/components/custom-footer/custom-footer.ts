import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { CartModal } from 'src/modals/cart-modal/cart-modal';
import { ModalHandler } from 'src/providers/modal-handler';

@Component({
  selector: 'custom-footer',
  templateUrl: 'custom-footer.html',
  styleUrls: ['custom-footer.scss']
})
export class CustomFooter {

  likeIcon = "assets/icon/heart_white.svg";
  cartIcon = "assets/icon/shopping_cart.svg";
  homeIcon = "assets/icon/home.svg";
  expandIcon = "assets/icon/"
  logoIcon = "assets/icon/logo_small.svg"

  columnArray = [
    {
      id: "back",
      link: "BACK",
      icon_width: "7vw",
      icon: "assets/icon/back.svg"
    },
    {
      id: "home",
      link: "dashboard",
      icon_width: "7vw",
      icon: "assets/icon/home.svg"
    },
    {
      id: "cart",
      link: "CART",
      icon_width: "7vw",
      icon: "assets/icon/shopping_cart.svg"
    },
    {
      // FIXME : make logo bigger
      id: "logo",
      link: "dashboard",
      icon_width: "9vw",
      icon: "assets/icon/logo_small.svg"
    },
  ]

  constructor(
    private router: Router,
    private location: Location,
    private modalHandler: ModalHandler
  ) {}

  openLink(link: string) {
    if (link == 'BACK') {
      this.modalHandler.closeAllModals();
      if (this.location.path() != '/dashboard') this.location.back();
    } else if (link == 'CART') {
      this.modalHandler.closeAllModals();
      this.modalHandler.openCartModal();
    } else {
      this.modalHandler.closeAllModals();
      this.router.navigate(['/' + link]);
    }
  }
}