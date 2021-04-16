import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CartHandler } from './cart-handler';
// import * as $ from 'jquery';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class OrderByEmailHandler {

  private url = 'https://santaios.gr';
  private consumerKey = 'ck_c87bb8148f824506cdf02c96c690bbc2b23e8d26';
  private consumerSecret = 'cs_e4e285d010e68fd87ad8a85c9f210b0e0e896caa';

  constructor(
    private emailComposer: EmailComposer,
    private http: HttpClient
  ) { 

  }

  public sendOrderEmail(
    customerInfo: {
      name: string,
      surname: string,
      phone: string,
      area: string,
      regUnit: string,
      zip: string,
      street: string,
      number: string,
      email: string
    },
    products: string
  ) {

  }

  getPaymentGateways() {
    let createOrderData = {
      payment_method: "cod",
      payment_method_title: "Cash on delivery",
      set_paid: false,
      status: "processing",
      billing: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market",
        city: "San Francisco",
        postcode: "57000",
        email: "viktorneasanta@gmail.com",
        phone: "(555) 555-5555",
        nomos: "Κιλκίς",
        perioxi: "Νέα Σάντα",
        orofos_: "Ισόγειο"
      },
      shipping: null,
      line_items: [
        {
          product_id: 3017,
          quantity: 3
        }
      ],
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
          value: "Θεσσαλονίκης"
        },
        {
          key: "perioxi",
          value: "Νέα Σάντα"
        },
        {
          key: "orofos_",
          value: "Ισόγειο"
        }
      ]
    }

    return new Promise(resolve => {
      this.http
        .post(
          `${this.url}/wp-json/wc/v3/orders?consumer_key=${
            this.consumerKey
          }&consumer_secret=${this.consumerSecret}`,
          createOrderData
         
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  public getInfo() {
    return new Promise(resolve => {
      this.http.get(
        `${this.url}/wp-json/wc/v3/orders/3111?per_page=100&page=1&consumer_key=${
          this.consumerKey
        }&consumer_secret=${this.consumerSecret}`
      ).subscribe(data => {
        resolve(data);
      })
    });
  }


}