import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {
  @Input() product:any
}
