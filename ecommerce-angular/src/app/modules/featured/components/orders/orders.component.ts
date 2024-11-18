import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  constructor(private router: Router){}

orders = [[1,1],[1,1,1]];
orderFilter = [
  {value:"on_the_way", label:"On The Way"},
  {value:"delivered", label:"Delivered"},
  {value:"cancelled", label:"Cancelled"},
  {value:"returned", label:"Returned"}
];


navigateToOrderDetails = (id:Number)=>{
  this.router.navigate([`order/${id}`])
}
}
