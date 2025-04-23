import { AppState } from './../../../../models/AppState';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../states/cart/cart.service';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) { }
  cart: any
  cartItems: any

  ngOnInit(): void {
    this.cartService.getCart();
    this.store.pipe(select((store) => store.cart.cart)).subscribe((cart) => {
      this.cart = cart;
      this.cartItems = cart?.cartItems || [];
      console.log("Full Cart Data", cart);
    });
    
  }
  navigateToCheckout() {
    this.router.navigate(['checkout'])
  }
}
