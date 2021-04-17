import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
// import * as $ from 'jquery';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class ContactFormService {

  private url = "https://santaios.gr/wp-json/contact-form-7/v1/contact-forms/481/feedback";

  constructor(
    private http: HttpClient
  ) { }

  public createContactForm(message) {

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "mailchimp_landing_site=https%3A%2F%2Fsantaios.gr%2Fwp-json%2Fcontavct-form-7%2Fv1%2Fcontact-forms%2F358%2Ffeedback; mc_session_ids[default]=5ebaaecfde882dd6a69efe457b84a187c68f57f3; mc_session_ids[multi][0]=ef7fd2959ed8b8c726b29969e874a3e6c845afb6; mc_session_ids[multi][1]=d2ca15ae117ae8ce68fe8785b4cb0d6972e84180; mc_session_ids[multi][2]=d5a7fdeacb0dcfecb16a53e331e72a43465955da; mc_session_ids[multi][3]=c03599fe2e60344eb47b099803a0735dc80e3284; mc_session_ids[multi][4]=477fc68240ef9f61d1ca10dc9320184b0c71c945");

    var formdata = new FormData();
      formdata.append("your-name", message.nameSurname);
      formdata.append("your-email", message.email);
      formdata.append("your-subject", message.subject);
      formdata.append("your-message", message.message);

    let requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(this.url, requestOptions)
      .then(response => response.text())
      .then(result => console.log("********   CONTACT FORM RESPONSE   ******** \n", result))
      .catch(error => console.log('error', error));
  }
}