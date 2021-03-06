import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CartHandler } from './cart-handler';
// import * as $ from 'jquery';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class CreateOrder {

  private url = 'https://santaios.gr';
  private consumerKey = 'ck_c87bb8148f824506cdf02c96c690bbc2b23e8d26';
  private consumerSecret = 'cs_e4e285d010e68fd87ad8a85c9f210b0e0e896caa';

  constructor(
    private http: HttpClient
  ) { }

  public handleOrder(
    products: {
      product_id: number,
      variation_id?: number,
      quantity: number
    }[], 
    userInfo: {
      name: string,
      surname: string,
      phone: string,
      area: string,
      regUnit: string,
      zip: string,
      address: string,
      floor: string,
      email: string,
      extraInfo: string,
      paymentMethod: {
        id: string,
        title: string
      }
    }
  ) {
    if (!userInfo.address) userInfo.address = '';

    let orderData = {
      payment_method: userInfo.paymentMethod.id,
      payment_method_title: userInfo.paymentMethod.title,
      set_paid: false,
      status: userInfo.paymentMethod.id == "cod" ? "processing" : "on-hold",
      customer_note: userInfo.extraInfo,
      billing: {
        first_name: userInfo.name,
        last_name: userInfo.surname,
        address_1: userInfo.address,
        city: "",
        postcode: userInfo.zip + '',
        email: userInfo.email,
        phone: userInfo.phone + ''
      },
      shipping: null,
      line_items: products,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "0"
        }
      ],
      meta_data: [
        {
          key: "nomos",
          value: userInfo.regUnit
        },
        {
          key: "perioxi",
          value: userInfo.area
        },
        {
          key: "orofos_",
          value: userInfo.floor
        }
      ]
    }

    return new Promise(resolve => {
      this.http
        .post(
          `${this.url}/wp-json/wc/v3/orders?consumer_key=${
            this.consumerKey
          }&consumer_secret=${this.consumerSecret}`,
          orderData
        )
        .subscribe(data => {
          console.log("********   CREATE ORDER RESPONSE   ******** \n", data)
          resolve(data);
        });
    });
  }
}