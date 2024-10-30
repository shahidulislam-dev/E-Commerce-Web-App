import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.scss'
})
export class ProductsSliderComponent {
  @Input() title:any;
  @Input() products: any;
}
