import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-button',
  templateUrl: 'category-button.html',
  styleUrls: ['category-button.scss'],
})
export class CategoryButton {
  // private forward_icon: string = "assets/icon/arrow_red.svg"; 

  @Input() name: string;
  @Input() icon: string;
  // @Input() iconByHeight: boolean;

  constructor(
  ) {}

  
}
