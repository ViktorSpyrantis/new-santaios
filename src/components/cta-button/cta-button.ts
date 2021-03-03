import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cta-button',
  templateUrl: 'cta-button.html',
  styleUrls: ['cta-button.scss']
})
export class CtaButton {
  @Input() label: string;
  @Input() icon?: string;
  @Input() ionIcon?: string;
  @Input() disabled?: boolean = false; 

  @Output() onClick = new EventEmitter;

  logo: string = "assets/icon/logo_no_letters.svg";

  constructor() {}

  buttonClick() {
    if (!this.disabled) this.onClick.emit();
  }
}