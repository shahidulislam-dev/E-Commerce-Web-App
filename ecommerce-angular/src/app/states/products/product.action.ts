import { createAction, props } from "@ngrx/store";

export const findProductsByCategoryRequest = createAction(
    '[Product] Find Products By Category Request'
)

export const findProductsByCategorySuccess = createAction(
    '[Product] Find Products By Category Success', props<{payload:any}>()
)

export const findProductsByCategoryFailure = createAction(
    '[Product] Find Products By Category Failure', props<{error:any}>()
)



export const findProductsByIdRequest = createAction(
    '[Product] Find Products By Id Request'
)

export const findProductsByIdSuccess = createAction(
    '[Product] Find Products By Id Success', props<{payload:any}>()
)

export const findProductsByIdFailure = createAction(
    '[Product] Find Products By Id Failure', props<{error:any}>()
)

