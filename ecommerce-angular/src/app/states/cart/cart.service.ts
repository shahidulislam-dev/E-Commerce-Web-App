import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, of } from "rxjs";

import {
    addItemToCartFailure,
    addItemToCartSuccess,
    getCartFailure,
    getCartSuccess,
    removeCartItemSuccess,
    updateCartItemFailure,
    updateCartItemSuccess
} from "./cart.action";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    BASE_API_URL = BASE_API_URL;

    constructor(
        private router: Router,
        private store: Store,
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }
    // This method is used to get the auth headers for the API requests.
    private getAuthHeaders(): HttpHeaders {
        let token = '';
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('jwt') || '';
        }

        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
    }

    addItemToCart(reqData: any) {
        const url = `${this.BASE_API_URL}/api/cart/add`;
        const headers = this.getAuthHeaders();

        return this.http.put(url, reqData, { headers })
            .pipe(
                map((data: any) => addItemToCartSuccess({ payload: data })),
                catchError((error: any) => {
                    const message = error?.response?.data?.message || error.message;
                    return of(addItemToCartFailure(message));
                })
            ).subscribe(action => this.store.dispatch(action));
    }

    getCart() {
        const url = `${this.BASE_API_URL}/api/cart/`;
        const headers = this.getAuthHeaders();

        return this.http.get(url, { headers })
            .pipe(
                map((data: any) => {
                    console.log("Cart Items", data);
                    return getCartSuccess({ payload: data });
                }),
                catchError((error: any) => {
                    const message = error?.response?.data?.message || error.message;
                    return of(getCartFailure(message));
                })
            ).subscribe(action => this.store.dispatch(action));
    }

    removeCartItem(cartItemId: any) {
        const url = `${this.BASE_API_URL}/api/cart/remove/item/${cartItemId}`;
        const headers = this.getAuthHeaders();

        return this.http.delete(url, { headers })
            .pipe(
                map((data: any) => {
                    console.log("Remove Cart Item", data);
                    return removeCartItemSuccess({ cartItemId });
                }),
                catchError((error: any) => {
                    const message = error?.response?.data?.message || error.message;
                    return of(addItemToCartFailure(message));
                })
            ).subscribe(action => this.store.dispatch(action));
    }

    updateCartItem(reqData: any) {
        const url = `${this.BASE_API_URL}/api/cart/update/item/${reqData.cartItemId}`;
        const headers = this.getAuthHeaders();

        return this.http.put(url, reqData, { headers })
            .pipe(
                map((data: any) => {
                    console.log("Updated Item", data);
                    return updateCartItemSuccess({ payload: data });
                }),
                catchError((error: any) => {
                    const message = error?.response?.data?.message || error.message;
                    return of(updateCartItemFailure(message));
                })
            ).subscribe(action => this.store.dispatch(action));
    }
}
