import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {
  constructor(private router: Router){}
  @Input() product:any

  navigate(){
    this.router.navigate([`/products-details/${5}`]);
  }
}
