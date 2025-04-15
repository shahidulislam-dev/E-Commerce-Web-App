import { createAction, props } from "@ngrx/store";

export const getUser = createAction('[User] Get User')

export const getUserSuccess = createAction('[User] Get User Profile Success', props<{userProfile:any}>())
export const getUserFailure = createAction('[User] Get User Profile Failure', props<{error:any}>())

