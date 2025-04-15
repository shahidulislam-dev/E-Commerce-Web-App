import { createReducer, on } from "@ngrx/store";
import { getUser, getUserFailure, getUserSuccess } from "./user.action";


const initialState = {
    userProfile:null,
    loading:false,
    error:null
}
export const userReducer = createReducer(
    initialState,
    on(getUser, (state)=> ({...state, loading:true, error:null})),
    on(getUserSuccess, (state,{userProfile})=> ({...state, loading:true, error:null, userProfile})),
    on(getUserFailure, (state, {error})=> ({...state, loading:false, error:error})),

    
)