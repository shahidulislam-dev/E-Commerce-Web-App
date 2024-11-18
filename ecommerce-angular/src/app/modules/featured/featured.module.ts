import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';import { HomeComponent } from './components/home/home.component';
import { HomeProductsCardComponent } from './components/home/home-products-card/home-products-card.component';
import { MainCarouselComponent } from './components/home/main-carousel/main-carousel.component';
import { ProductsSliderComponent } from './components/home/products-slider/products-slider.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FeaturedComponent } from './components/featured.component';
import { ProductsComponent } from './components/products/products.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { CartComponent } from './components/cart/cart.component';
import { PrductsDetailsComponent } from './components/prducts-details/prducts-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductsReviewCardComponent } from './components/prducts-details/products-review-card/products-review-card.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AddressFormComponent } from './components/checkout/address-form/address-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    HomeComponent,
    HomeProductsCardComponent,
    MainCarouselComponent,
    ProductsSliderComponent,
    FeaturedComponent,
    ProductsComponent,
    CartComponent,
    PrductsDetailsComponent,
    CheckoutComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ProductsReviewCardComponent,
    AddressFormComponent

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
],
  exports:[
    HomeComponent,
    FeaturedComponent,
    ProductsComponent,
    CartComponent,
    PrductsDetailsComponent,
    CheckoutComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    OrdersComponent,
    OrderDetailsComponent
  ]
})
export class FeaturedModule { }
