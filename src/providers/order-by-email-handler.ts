import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CartHandler } from './cart-handler';
import * as $ from 'jquery';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class OrderByEmailHandler {

  private email = "sandorclegane34@yahoo.gr";
  private api = "https://formspree.io/f/mdoppbed"

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

    var templateParams = {
      name: 'James',
      notes: 'Check this out!'
    };
   
    emailjs.send('viktorneasanta@gmail.com', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });

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

  // $.http({
  //   method: 'POST',
  //   url: 'src/app/php/send-order-email.php'
  // })

  $.ajax({
    url: '../../php/send-order-email.php',
    type: 'POST',
    data: "formData",
    async: false,
    cache: false,
    contentType: false,
    
    enctype: 'multipart/form-data',
    processData: false,
    success: function (response) {
      alert(response);
    }
  });

  
  }

}