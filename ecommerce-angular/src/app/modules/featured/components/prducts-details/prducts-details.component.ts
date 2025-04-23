import { Component } from '@angular/core';
import { mensPantsPage1 } from '../../../../../Data/pants/men_page1';
import { ActivatedRoute,  Router } from '@angular/router';
import { ProductService } from '../../../../states/products/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';
import { CartService } from '../../../../states/cart/cart.service';

@Component({
  selector: 'app-prducts-details',
  templateUrl: './prducts-details.component.html',
  styleUrl: './prducts-details.component.scss'
})
export class PrductsDetailsComponent {

  constructor(
    private router: Router, 
    private productServie: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ){}
  selectedSize:any
  reviews = [1,1,1,1,1]
  relatedProducts:any
  product:any
  productId:any

  ngOnInit(){
    this.relatedProducts = mensPantsPage1;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productServie.findProductById(id);
    this.productId = id;

    this.store.pipe(select((state) => state.product.product)).subscribe((product) => {
      this.product = product;
      console.log("Store Product Detail Data", product);
    });
  }

  handleAddToCart() {
    const data = {size: this.selectedSize, productId: this.productId}
    this.cartService.addItemToCart(data)
    console.log("Selected Size", data);
    this.cartService.getCart()
    this.router.navigate(['cart'])
    }

}
