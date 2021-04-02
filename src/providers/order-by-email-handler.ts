import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CartHandler } from './cart-handler';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class OrderByEmailHandler {

  private email = "sandorclegane34@yahoo.gr";
  private api = "https://formspree.io/f/mdoppbed"

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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.api,
      { 
        FULL_NAME: customerInfo.name + ' ' + customerInfo.surname, 
        ADDRESS: customerInfo.street + ' ' + customerInfo.number + ', ' + customerInfo.area + ' (' + customerInfo.regUnit + '), ' + customerInfo.zip,
        PHONE: customerInfo.phone,
        EMAIL: customerInfo.email,
        PURCHASE: products

      },
      {
        'headers': headers 
      }).subscribe(
        response => {
          console.log(response);
        }
      );

  }

  public sendEmailTest() {
    // let email = {
    //   to: 'marcelochello20@gmail.com',
    //   cc: 'viktorneasanta@gmail.com',
    //   bcc: ['', ''],
    //   subject: 'Cordova Icons',
    //   body: 'How are you? Nice greetings from Leipzig',
    //   isHtml: true
    // }

    // this.emailComposer.open(email);

    // var templateParams = {
    //   name: 'James',
    //   notes: 'Check this out!'
    // };
   
    // emailjs.send('viktorneasanta@gmail.com', 'YOUR_TEMPLATE_ID', templateParams)
    //   .then(function(response) {
    //      console.log('SUCCESS!', response.status, response.text);
    //   }, function(error) {
    //      console.log('FAILED...', error);
    //   });

    // public sendEmail(e: Event) {
    //   e.preventDefault();
    //   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_USER_ID')
    //     .then((result: EmailJSResponseStatus) => {
    //       console.log(result.text);
    //     }, (error) => {
    //       console.log(error.text);
    //     });
    // }
    // const nodemailer = require('nodemailer');
    // let transport = nodemailer.createTransport(options[, defaults])

  //   let transport = nodemailer.createTransport({
  //     host: 'smtp.mailtrap.io',
  //     port: 2525,
  //     auth: {
  //        user: '4aedbc352a7c7e',
  //        pass: '351ea631b8aea7'
  //     }
  // });


    // let transporter = nodemailer.createTransport(transport[, defaults])
    // const message = {
    //   from: 'viktorspyrantis@gmail.com', // Sender address
    //   to: 'viktorneasanta@gmail.com',         // List of recipients
    //   subject: 'Design Your Model S | Tesla', // Subject line
    //   text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
    // };
    // transport.sendMail(message, function(err, info) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       console.log(info);
    //     }
  // });




  // return `${url}/wp-json/wc/v3/products?consumer_key=${
  //   consumerKey
  // }&consumer_secret=${consumerSecret}`;
  
  }

  getPaymentGateways() {
    return new Promise(resolve => {
      // this.http.get(
      //   `${this.url}/wp-json/wc/v3/payment_gateways?consumer_key=${
      //     this.consumerKey
      //   }&consumer_secret=${this.consumerSecret}`
      // ).subscribe(data => {
      //   resolve(data);
      // })
      this.http
        .post(
          `${this.url}/wp-json/wc/v3/orders?consumer_key=${
            this.consumerKey
          }&consumer_secret=${this.consumerSecret}`,
          `{
            "payment_method": "bacs",
            "payment_method_title": "Direct Bank Transfer",
            "set_paid": true,
            "billing": {
              "first_name": "John",
              "last_name": "Doe",
              "address_1": "969 Market",
              "address_2": "",
              "city": "San Francisco",
              "state": "CA",
              "postcode": "94103",
              "country": "US",
              "email": "viktorneasanta@gmail.com",
              "phone": "(555) 555-5555"
            },
            "shipping": {
              "first_name": "John",
              "last_name": "Doe",
              "address_1": "969 Market",
              "address_2": "",
              "city": "San Francisco",
              "state": "CA",
              "postcode": "94103",
              "country": "US"
            },
            "line_items": [
              {
                "product_id": 3017,
                "quantity": 2
              },
              {
                "product_id": 3-15,
                "variation_id": 23,
                "quantity": 1
              }
            ],
            "shipping_lines": [
              {
                "method_id": "flat_rate",
                "method_title": "Flat Rate",
                "total": "10.00"
              }
            ]
          }`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }


}