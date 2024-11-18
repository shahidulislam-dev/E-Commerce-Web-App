import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent {

  @Input() showButton:any;

  updateCartItem(num:any){
    console.log("number",num)
  }

  removeCartItem(){
    console.log("Remove Cart Item");
    
  }
}
