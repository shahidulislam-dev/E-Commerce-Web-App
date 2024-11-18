import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private router: Router){}
  cart = [1,1,1]

  navigateToCheckout(){
    this.router.navigate(['checkout'])
  }
}
