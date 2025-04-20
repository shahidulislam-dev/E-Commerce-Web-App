import { Injectable, inject, isDevMode } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { getUserFailure, getUserSuccess, logoutSuccess } from "./user.action";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = BASE_API_URL + "/api/users";

  constructor(private http: HttpClient, private store: Store) {}

  getUserProfile() {
    let token: string | null = null;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt");
    }

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/profile`, { headers }).pipe(
      map((user: any) => {
        console.log("Get User Profile Success", user);
        return getUserSuccess({ userProfile: user });
      }),
      catchError((error) => {
        const errorMessage =
          error?.response?.data?.message || error?.message || "Unknown error";
        return of(getUserFailure(errorMessage));
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  logout(){
    localStorage.removeItem("jwt");
    this.store.dispatch(logoutSuccess())
}
}
