import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-home-products-card',
  templateUrl: './home-products-card.component.html',
  styleUrl: './home-products-card.component.scss'
})
export class HomeProductsCardComponent {
  @Input() product:any
}
