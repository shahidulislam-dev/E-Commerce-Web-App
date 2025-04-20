import { ActivatedRoute, Router } from '@angular/router';
import { BASE_API_URL } from './../../config/api';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { findProductsByCategoryFailure, findProductsByCategorySuccess, findProductsByIdFailure, findProductsByIdSuccess } from './product.action';


@Injectable({
    providedIn: 'root'
})

export class ProductService {
    BASE_API_URL = BASE_API_URL;

    constructor(private router: Router, private store: Store,
        private http: HttpClient, private route: ActivatedRoute
    ) { }

    private getHeaders(): HttpHeaders {
        let token: string | null = null;

        if (typeof window !== "undefined") {
            token = localStorage.getItem("jwt");
        }

        return new HttpHeaders().set("Authorization", `Bearer ${token}`);
    }

    findProductByCategory(reqData: any) {
        const {
            colors,
            sizes,
            minPrice,
            maxPrice,
            minDiscount,
            category,
            stock,
            sort,
            pageNumber,
            pageSize
        } = reqData;

        let params = new HttpParams().set("colors", colors)
            .set("size", sizes)
            .set("minPrice", minPrice)
            .set("maxPrice", maxPrice).set("minDiscount", minDiscount)
            .set("category", category)
            .set("stock", stock).set("sort", sort).set("pageNumber", pageNumber)
            .set("pageSize", pageSize);

        const headers = this.getHeaders()

        return this.http.get(`${this.BASE_API_URL}/api/products`, { headers, params })
            .pipe(
                map((data: any) => {
                    console.log("Products Data", data);
                    return findProductsByCategorySuccess({ payload: data })

                }),
                catchError((error: any) => {
                    return of(findProductsByCategoryFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message

                    ))
                })
            ).subscribe((action) => this.store.dispatch(action));
    }

    findProductById(productId: any) {
        const headers = this.getHeaders()

        return this.http.get(`${this.BASE_API_URL}/api/products/id/${productId}`, { headers })
            .pipe(
                map((data: any) => {
                    console.log("Products Details", data);
                    return findProductsByIdSuccess({ payload: data })

                }),
                catchError((error: any) => {
                    return of(findProductsByIdFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    ))
                })
            ).subscribe((action) => this.store.dispatch(action))
    }


}