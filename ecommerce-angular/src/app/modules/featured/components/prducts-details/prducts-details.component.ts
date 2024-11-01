import { Component } from '@angular/core';

@Component({
  selector: 'app-prducts-details',
  templateUrl: './prducts-details.component.html',
  styleUrl: './prducts-details.component.scss'
})
export class PrductsDetailsComponent {

  selectedSize:any
  reviews = [1,1,1,1,1]
  handleAddToCart() {
    console.log("Selected Size", this.selectedSize);
    
    }

}
