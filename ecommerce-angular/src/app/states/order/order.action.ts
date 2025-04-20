import { createAction, props } from "@ngrx/store";

export const createOrderRequest = createAction(
    '[Order] Create Order Request',
    props<{ reqData: any}>()
);
export const createOrderSuccess = createAction(
    '[Order] Create Order Success',
    props<{ order: any}>()
);
export const createOrderFailure = createAction(
    '[Order] Create Order Failure',
    props<{ error: any}>()
);

export const getOrederByIdRequest = createAction(
    '[Order] Get Order By Id Request',
    props<{ reqData: any}>()
);
export const getOrederByIdSuccess = createAction(
    '[Order] Get Order By Id Success',
    props<{ orderId: any}>()
);
export const getOrederByIdFailure = createAction(
    '[Order] Get Order By Id Failure',
    props<{ error: any}>()
);
export const getOrderHistoryRequest = createAction(
    '[Order] Get Order History Request',
);
export const getOrderHistorySuccess = createAction(
    '[Order] Get Order History Success',
    props<{ orders: any}>()
);
export const getOrderHistoryFailure = createAction(
    '[Order] Get Order History Failure',
    props<{ error: any}>()
);