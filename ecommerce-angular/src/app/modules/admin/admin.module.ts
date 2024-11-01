import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductsTableComponent,
    OrdersTableComponent,
    CustomersComponent,
    CreateProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
