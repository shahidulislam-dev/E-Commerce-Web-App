import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarContentComponent } from './components/navbar/navbar-content/navbar-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarContentComponent,
    FooterComponent,
    ProductsCardComponent,
    StarRatingComponent,
    CartItemsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports:[
    NavbarComponent, 
    FooterComponent,
    ProductsCardComponent,
    StarRatingComponent,
    CartItemsComponent
  ]
})
export class SharedModule { }
