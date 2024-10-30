import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';import { HomeComponent } from './components/home/home.component';
import { HomeProductsCardComponent } from './components/home/home-products-card/home-products-card.component';
import { MainCarouselComponent } from './components/home/main-carousel/main-carousel.component';
import { ProductsSliderComponent } from './components/home/products-slider/products-slider.component';
import { AppRoutingModule } from '../../app-routing.module';




@NgModule({
  declarations: [
    HomeComponent,
    HomeProductsCardComponent,
    MainCarouselComponent,
    ProductsSliderComponent

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports:[
    HomeComponent
  ]
})
export class FeaturedModule { }
