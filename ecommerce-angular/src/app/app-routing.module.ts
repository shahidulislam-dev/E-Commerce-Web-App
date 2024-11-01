import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/featured/components/home/home.component';
import { CartComponent } from './modules/featured/components/cart/cart.component';
import { PrductsDetailsComponent } from './modules/featured/components/prducts-details/prducts-details.component';
import { ProductsComponent } from './modules/featured/components/products/products.component';
import { CheckoutComponent } from './modules/featured/components/checkout/checkout.component';
import { PaymentComponent } from './modules/featured/components/payment/payment.component';
import { PaymentSuccessComponent } from './modules/featured/components/payment-success/payment-success.component';
import { OrdersComponent } from './modules/featured/components/orders/orders.component';
import { OrderDetailsComponent } from './modules/featured/components/order-details/order-details.component';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';

const routes: Routes = [
  {path: "admin", loadChildren: ()=>import("./modules/admin/admin-routing.module").then(m=>AdminRoutingModule)},
  {path:"", component: HomeComponent},
  {path: "cart", component:CartComponent},
  {path: "products-details/:id", component:PrductsDetailsComponent},
  {path: "checkout", component:CheckoutComponent},
  {path: "checkout/payment/:id", component:PaymentComponent},
  {path:':lavelOne/:lavelTwo/:levelThree', component: ProductsComponent},
  {path: "payment-success", component:PaymentSuccessComponent},
  {path: "account/orders", component:OrdersComponent},
  {path: "order/:id", component:OrderDetailsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
