
import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CartHandler } from 'src/providers/cart-handler';
import { ModalHandler } from 'src/providers/modal-handler';
import { OrderByEmailHandler } from 'src/providers/order-by-email-handler';
import { UNITS } from 'src/providers/regional-units';
import { AREAS } from 'src/providers/areas';

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
  // areaNeedsStreetAndNumberInfo: boolean = false;
  floors = ['Ισόγειο', '1', '2' ,'3' ,'4', '5', '6'];
  
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
    extraInfo: "Πρόσθετες πληροφορίες"
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
    extraInfo: string
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
    extraInfo: null
  }

  constructor(
    private modalCtrl: ModalController,
    private emailOrder: OrderByEmailHandler,
    private alertController: AlertController,
    private cart: CartHandler,
    private modalHandler: ModalHandler
  ) {
    this.regionalUnits = UNITS;
  }

  private configProductsString(): string {
    let products: string = '';

    this.cart.getProductsInCart().forEach(prod => {
      products += 
        prod.name + '\r\n' +
        'ΤΙΜΗ: ' + (parseFloat(prod.price.replace(/,/g, '.')) * (prod.weight ? prod.weight : prod.quantity)) + 
        '\r\n \r\n'
    })

    return products;
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
            console.log("$$$$$")
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
      && (this.areaNeedsAddressInfo ? this.customerInfo.address : true))
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

  // FIXME : handle all functionality on a page rather than on modal maybe
  proceedWithOrder() {
    // this.emailOrder.sendOrderEmail(this.customerInfo, this.configProductsString());
    this.emailOrder.sendEmailTest();
    this.dismiss();
    this.cart.deleteProducts();
  }

  dismiss() {
    this.modalHandler.closeOrderModal();
  }

}