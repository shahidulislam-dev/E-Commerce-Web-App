import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import path from 'path';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';

const routes: Routes = [
  {path:"", component: AdminComponent, children:[
    {path:"", component: DashboardComponent},
    {path:"products", component: ProductsTableComponent},
    {path:"orders", component: OrdersTableComponent},
    {path:"customers", component: CustomersComponent},
    {path:"products/create", component: CreateProductsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
