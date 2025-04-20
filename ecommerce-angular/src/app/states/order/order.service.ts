import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import { createOrderFailure, createOrderSuccess, getOrderHistoryFailure, getOrderHistoryRequest, getOrderHistorySuccess, getOrederByIdFailure, getOrederByIdSuccess } from "./order.action";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    BASE_API_URL = BASE_API_URL;
    private headers;

    constructor(private router: Router, private store: Store,
        private http: HttpClient, private route: ActivatedRoute
    ) {
        this.headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        });
    }

    createOrder(reqData: any) {
        console.log("Create Order", reqData);
        const url = `${this.BASE_API_URL}/api/orders/create`;
        return this.http.post(url, { headers: this.headers })
        .pipe(
            map((data:any) => {
                if(data.id) {
                    this.router.navigate([`/checkout/payment/${data.id}`], {
                        queryParams: {step: '3', order_id: data.id},
                    });
                }
                console.log("Order Created", data);
                return createOrderSuccess({ order: data})
            }),
            catchError((error: any) => {
                console.log("Catch Error", error);
                return of(
                    createOrderFailure(
                        error.response && error.response.data ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

    getOrderById(orderId: string) {
        const url = `${this.BASE_API_URL}/api/orders/find/${orderId}`;
        return this.http.get(url, { headers: this.headers })
        .pipe(
            map((data:any) => {
                console.log("Order By Id", data);
                return getOrederByIdSuccess({ orderId: data})
            }),
            catchError((error: any) => {
                console.log("Catch Error", error);
                return of(
                    getOrederByIdFailure(
                        error.response && error.response.data ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => this.store.dispatch(action))
    }


    getOrderHistory() {
        const url = `${this.BASE_API_URL}/api/orders/user/order/history`;

        return this.http.get(url, { headers: this.headers })
        .pipe(
            map((data:any) => {
                console.log("Order History", data);
                return getOrderHistorySuccess({ orders: data})
            }),
            catchError((error: any) => {
                console.log("Catch Error", error);
                return of(
                    getOrderHistoryFailure(
                        error.response && error.response.data ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => this.store.dispatch(action))
    }
}