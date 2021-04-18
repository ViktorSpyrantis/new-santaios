
import { Component, ComponentFactoryResolver, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartHandler } from 'src/providers/cart-handler';
import { ModalHandler } from 'src/providers/modal-handler';
import { UNITS } from 'src/providers/regional-units';
import { AREAS } from 'src/providers/areas';
import { CreateOrder } from 'src/providers/create-order';

@Component({
  selector: 'order-modal',
  templateUrl: 'order-modal.html',
  styleUrls: ['order-modal.scss'],
})
export class OrderModal {

  title: string = "ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ";
  backButtonLabel: string = "Πίσω";
  orderButtonLabel: string = "Επιβεβαίωση";
  regionalUnits = [];
  areas = [];
  areaNeedsAddressInfo: boolean = false;
  floors = ['Ισόγειο', '1', '2' ,'3' ,'4', '5', '6', '7', '8'];
  // We handle payment methods statically, not dynamically
  purchaseMethods = [
    {
      id: 'cod',
      title: 'Αντικαταβολή'
    }, 
    {
      id: 'other_payment',
      title: 'Πληρωμή μέσω POS'
    }
  ];
  
  forms = {
    name: "Όνομα <font color='red'>*</font>",
    surname: "Επώνυμο <font color='red'>*</font>",
    phone: "Τηλέφωνο επικοινωνίας <font color='red'>*</font>",
    regUnit: "Νομός <font color='red'>*</font>",
    area: "Περιοχή <font color='red'>*</font>",
    zip: "Τ.Κ",
    // street: "Οδός <font color='red'>*</font>",
    // number: "Αριθμός <font color='red'>*</font>",
    address: "Διεύθυνση <font color='red'>*</font>",
    floor: "Όροφος",
    email: "E-mail <font color='red'>*</font>",
    extraInfo: "Πρόσθετες πληροφορίες",
    paymentMethod: "Μέθοδος πληρωμής"
  }

  customerInfo: {
    name: string,
    surname: string,
    phone: string,
    area: string,
    regUnit: string,
    zip: string,
    // street: string,
    // number: number,
    address: string,
    floor: string,
    email: string,
    extraInfo: string,
    paymentMethod: {
      id: string,
      title: string
    }
  } = {
    name: null,
    surname: null,
    phone: null,
    area: null,
    regUnit: null,
    zip: null,
    // street: null,
    // number: null,
    address: null,
    floor: "Ισόγειο",
    email: null,
    extraInfo: null,
    paymentMethod: {
      id: null,
      title: null
    }
  }

  constructor(
    private alertController: AlertController,
    private cart: CartHandler,
    private modalHandler: ModalHandler,
    private order: CreateOrder
  ) {
    this.regionalUnits = UNITS;
  }

  // Show alert popup for order confirmation
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Επιβεβαίωση παραγγελίας',
      message: '<strong>Θα θέλατε να γίνει καταχώρηση της παραγγελίας σας;</strong>',
      buttons: [
        {
          text: 'Όχι',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Ναι',
          handler: () => {
            this.proceedWithOrder();
          }
        }
      ]
    });

    await alert.present();
  }

  // Show alert popup for order confirmation
  async presentAlertDataNotValid() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ελειπή στοιχεία',
      message: '<strong>Δεν έχετε συμπληρώσει επαρκώς τα στοιχεία σας</strong>',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.proceedWithOrder();
          }
        }
      ]
    });

    await alert.present();
  }

  goToCart() {
    this.modalHandler.openCartModal();
  }

  requiredFieldsNotFilled(): boolean {
    if (this.customerInfo.name && this.customerInfo.surname && this.customerInfo.phone && 
      this.customerInfo.area && this.customerInfo.regUnit && this.customerInfo.email 
      && (this.areaNeedsAddressInfo ? this.customerInfo.address : true) && this.customerInfo.paymentMethod.title)
      return false;
    else {
      return true;
    }
  }

  getAreas() {
    this.customerInfo.area = null;
    this.areaNeedsAddressInfo = false;
    this.areas = [];
    AREAS.forEach(area => {
      if (area[1] == this.customerInfo.regUnit) this.areas.push(area[0]);
    })
  }

  areaChanged() {
    AREAS.forEach(area => {
      if (area[0] == this.customerInfo.area) {
        if(area[2]) this.areaNeedsAddressInfo = true;
        else this.areaNeedsAddressInfo = false;
      }
    })
  }

  assignPaymentMethod(event) {
    this.purchaseMethods.forEach(method => {
      if (method.title == event.detail.value) this.customerInfo.paymentMethod = method;
    })
  }

  // FIXME : handle all functionality on a page rather than on modal maybe
  proceedWithOrder() {
    let products: { product_id: number, variation_id?: number, quantity: number}[] = [];
    this.cart.getProductsInCart().forEach(prod => {
      prod.variations[prod.variations.length - 1] ? 
      products.push({
        product_id: prod.id,
        variation_id: prod.variations[prod.variations.length - 1],
        quantity: prod.weight
      }) : 
      products.push({
        product_id: prod.id,
        quantity: prod.weight
      })
    })

    this.order.handleOrder(products, this.customerInfo);
    this.dismiss();
    this.cart.deleteProducts();
  }

  dismiss() {
    this.modalHandler.closeOrderModal();
  }

}