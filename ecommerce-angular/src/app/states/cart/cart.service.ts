import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import { addItemToCartFailure, addItemToCartSuccess, getCartFailure, getCartSuccess, removeCartItemSuccess, updateCartItemFailure, updateCartItemSuccess } from "./cart.action";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    BASE_API_URL = BASE_API_URL;

   
    constructor(private router: Router, private store: Store,
        private http: HttpClient, private route: ActivatedRoute
    ) {}

    addItemToCart(reqData:any){
        const url = `${this.BASE_API_URL}/api/cart/add`;
        const headers = new HttpHeaders({
            Authorization : `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type' : 'application/json',
        });

        return this.http.put(url, reqData, {headers})
        .pipe(
            map((data:any)=> {
                return addItemToCartSuccess({payload:data});
            }),
            catchError((error:any)=> {
                return of(addItemToCartFailure(error.response && error.response.data
                     ? error.response.data.message 
                     : error.message))
            })
        ).subscribe((action)=>this.store.dispatch(action));
    }


    getCart(){
        const url = `${this.BASE_API_URL}/api/cart/`;
        const headers = new HttpHeaders({
            Authorization : `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type' : 'application/json',
        });

        return this.http.get(url, {headers})
        .pipe(
            map((data:any)=> {
                console.log("Cart Items", data)
                return getCartSuccess({payload:data});
            }),
            catchError((error:any)=> {
                return of(getCartFailure(error.response && error.response.data
                     ? error.response.data.message 
                     : error.message))
            })
        ).subscribe((action)=>this.store.dispatch(action));
    }


    removeCartItem(cartItemId:any){
        const url = `${this.BASE_API_URL}/api/cart/remove/item/${cartItemId}`;
        const headers = new HttpHeaders({
            Authorization : `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type' : 'application/json',
        });

        return this.http.delete(url, {headers})
        .pipe(
            map((data:any)=>{
                console.log("Remove Cart Item", data);
                return removeCartItemSuccess({cartItemId})
            }),
            catchError((error:any)=> {
                return of(addItemToCartFailure(error.response && error.response.data
                     ? error.response.data.message 
                     : error.message))
            })
        ).subscribe((action)=>this.store.dispatch(action));
    }


    updateCartItem(reqData:any){
        const url = `${this.BASE_API_URL}/api/cart/update/item/${reqData.cartItemId}`;
        const headers = new HttpHeaders({
            Authorization : `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type' : 'application/json',
        });

        return this.http.put(url, reqData, {headers})
        .pipe(
            map((data:any)=> {
                console.log("Updated Item", data);
                return updateCartItemSuccess({payload:data});
            }),
            catchError((error:any)=> {
                return of(updateCartItemFailure(error.response && error.response.data
                     ? error.response.data.message 
                     : error.message))
            })
        ).subscribe((action)=>this.store.dispatch(action));
    }

   
}