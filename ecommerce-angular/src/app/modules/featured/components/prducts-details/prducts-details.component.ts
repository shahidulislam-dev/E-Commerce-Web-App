import { Component } from '@angular/core';
import { mensPantsPage1 } from '../../../../../Data/pants/men_page1';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-prducts-details',
  templateUrl: './prducts-details.component.html',
  styleUrl: './prducts-details.component.scss'
})
export class PrductsDetailsComponent {

  constructor(private router: Router){}
  selectedSize:any
  reviews = [1,1,1,1,1]
  relatedProducts:any

  ngOnInit(){
    this.relatedProducts = mensPantsPage1;
  }
  handleAddToCart() {
    console.log("Selected Size", this.selectedSize);
    this.router.navigate(['cart'])
    }

}
