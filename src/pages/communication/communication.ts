import { Component } from '@angular/core';

@Component({
  selector: 'communication',
  templateUrl: 'communication.html',
  styleUrls: ['communication.scss'],
})
export class CommunicationPage {

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
    phone: "Τηλέφωνο επικοινωνίας",
    message: "Το μήνυμά σας"
  }

  message = {
    nameSurname: null,
    email: null,
    phone: null,
    message: null
  }

  button = {
    icon: "send-outline",
    label: "Αποστολή"
  }

  communicateWithUsText: string = "Επικοινωνήστε μαζί μας"

  constructor(

  ) {
  }

  sendMessage() {
    // FIXME : to be implemented 
  }
}