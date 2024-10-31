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
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";




@NgModule({
  declarations: [
    HomeComponent,
    HomeProductsCardComponent,
    MainCarouselComponent,
    ProductsSliderComponent,
    FeaturedComponent,
    ProductsComponent

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    SharedModule
],
  exports:[
    HomeComponent,
    FeaturedComponent,
    ProductsComponent
  ]
})
export class FeaturedModule { }
