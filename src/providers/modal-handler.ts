import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModal } from 'src/modals/cart-modal/cart-modal';
import { OrderModal } from 'src/modals/order-modal/order-modal';

@Injectable()
export class ModalHandler {

  private cartModalIsOpened: boolean = false;
  private orderModalIsOpened: boolean = false;

  constructor(
    private modalCtrl: ModalController,
  ) { 
    
  }

  public async openCartModal() {
    if (!this.cartModalIsOpened) {
      const modal = await this.modalCtrl.create({
        component: CartModal,
        cssClass: 'todo'
      });
      this.cartModalIsOpened = true;
      return await modal.present();
    } else {
      this.closeCartModal();
    }
  }

  public async openOrderModal() {
    if (!this.orderModalIsOpened) {
      const modal = await this.modalCtrl.create({
        component: OrderModal,
        cssClass: 'todo'
      });
      this.orderModalIsOpened = true;
      return await modal.present();
    } else {
      this.closeOrderModal();
    }
  }

  public closeCartModal() {
    console.log("CART MODAL OPENED: ", this.cartModalIsOpened)
    if (this.cartModalIsOpened) this.modalCtrl.dismiss({'dismissed': true});
    this.cartModalIsOpened = false;
  }

  public closeOrderModal() {
    console.log("ORDER MODAL OPENED: ", this.orderModalIsOpened)
    if (this.orderModalIsOpened) this.modalCtrl.dismiss({'dismissed': true});
    this.orderModalIsOpened = false;
  }

  // public setCartModalState(state: boolean) {
  //   this.cartModalIsOpened = state;
  // }

  // public setOrderModalState(state: boolean) {
  //   this.orderModalIsOpened = state;
  // }

  // public getCartModalState(): boolean {
  //   return this.cartModalIsOpened;
  // }

  // public getOrderModalState(): boolean {
  //   return this.orderModalIsOpened;
  // }

  public isAnyModalOpened(): boolean {
    console.log("ALL MODALS OPENED: ", this.cartModalIsOpened, '   ', this.orderModalIsOpened)
    if (this.cartModalIsOpened || this.orderModalIsOpened) return true;
    else return false;
  }

  public closeAllModals() {
    if(this.isAnyModalOpened())
      this.modalCtrl.dismiss({'dismissed': true});
    this.cartModalIsOpened = false;
    this.orderModalIsOpened = false;
  }
}

export enum Modals {
  CART,
  ORDER
}