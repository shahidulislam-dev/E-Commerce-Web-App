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
import { AddressCardComponent } from './components/address-card/address-card.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderTrackerComponent } from './components/order-tracker/order-tracker.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarContentComponent,
    FooterComponent,
    ProductsCardComponent,
    StarRatingComponent,
    CartItemsComponent,
    AddressCardComponent,
    OrderCardComponent,
    OrderTrackerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
  ],
  exports:[
    NavbarComponent, 
    FooterComponent,
    ProductsCardComponent,
    StarRatingComponent,
    CartItemsComponent,
    AddressCardComponent,
    OrderCardComponent,
    OrderTrackerComponent,
  ]
})
export class SharedModule { }
