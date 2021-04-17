import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
// import * as $ from 'jquery';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class ContactFormService {

  private url = 'https://santaios.gr';

  constructor(
    private http: HttpClient
  ) { }

  public createContactForm(message) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let options = {headers: headers}

    let messageData = {
      'your-name': 'Viktor Spyrantis',
      'your-email': 'viktorneasanta@gmail.com',
      'your-subject': 'test subject',
      'your-message': 'test message'
    }

    return new Promise(resolve => {
      this.http
        .post(
          `${this.url}/wp-json/contact-form-7/v1/contact-forms/481/feedback`,
          messageData
        )
        .subscribe(data => {
          console.log("********   CONTACT FORM RESPONSE   ******** \n", data)
          resolve(data);
        });
    });
  }
}