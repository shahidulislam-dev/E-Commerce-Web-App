import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { getUserFailure, getUserSuccess } from "./user.action";

@Injectable({
    providedIn: 'root',
})

export class UserService{
    private apiUrl = BASE_API_URL+"/auth";
    headers:any

    constructor(private http: HttpClient, private store: Store){
        this.headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
    }
    

    getUserProfile(){
        return this.http.get(`${this.apiUrl}/profile`, {headers:this.headers}).pipe(
            map((user:any)=>{
                console.log("Get User Profile Success"+user);
                
                return getUserSuccess({userProfile:user})
                
            }),
            catchError((error)=>{
                return of(
                    getUserFailure(
                        error.response && error.response.data.message ?
                        error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action)=> this.store.dispatch(action))
    }

}