import { Component } from '@angular/core';
import { ContactFormService } from 'src/providers/contact-form-service';

@Component({
  selector: 'communication',
  templateUrl: 'communication.html',
  styleUrls: ['communication.scss'],
})
export class CommunicationPage {

  messageRequestSuccesful: boolean;
  messageRequestFailed: boolean;
  outcomeMessage: string;
  outcome = {
    resolved: "Το μήνυμά σας έχει σταλεί επιτυχώς!",
    rejected: "Αντιμετωπίσαμε κάποιο πρόβλημα κατά την αποστολή του μηνύματός σας."
  }

  info: {
    address: {
      iconName: string,
      text: string
    },
    phone: {
      iconName: string,
      text: string
    },
    email: {
      iconName: string,
      text: string
    }
  } = {
    address: {
      iconName: "location-outline",
      text: "Αλεξάνδρου Παπάγου 34 & Γευγελής γωνία"
    },
    phone: {
      iconName: "call-outline",
      text: "+30 2311-823.163"
    },
    email:{
      iconName: "mail-outline",
      text: "info@santaios.gr"
    } 
  }

  forms = {
    nameSurname: "Ονοματεπώνυμο",
    email: "Email",
    subject: "Θέμα",
    message: "Το μήνυμά σας"
  }

  message = {
    nameSurname: null,
    email: null,
    subject: null,
    message: null
  }

  button = {
    icon: "send-outline",
    label: "Αποστολή"
  }

  communicateWithUsText: string = "Επικοινωνήστε μαζί μας"

  constructor(
    private contactForm: ContactFormService
  ) {
  }

  ionViewWillEnter() {
    this.message.nameSurname = null;
    this.message.email = null;
    this.message.subject = null;
    this.message.message = null;
    this.messageRequestSuccesful = null;
    this.messageRequestFailed = null;
    this.outcomeMessage = null;
  }

  sendMessage() {
    this.contactForm.createContactForm(this.message).then(result => {
      console.log()
      this.messageRequestSuccesful = true;
      this.messageRequestFailed = false;
      this.outcomeMessage = this.outcome.resolved;
    }).catch(error => {
      this.messageRequestFailed = true;
      this.messageRequestSuccesful = false;
      this.outcomeMessage = this.outcome.rejected;
    });
    this.message.nameSurname = null;
    this.message.email = null;
    this.message.subject = null;
    this.message.message = null;
  }
}