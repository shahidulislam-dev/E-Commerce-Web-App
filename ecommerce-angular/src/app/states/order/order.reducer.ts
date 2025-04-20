import { createReducer, on } from "@ngrx/store";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getOrderHistoryFailure, getOrderHistoryRequest, getOrderHistorySuccess, getOrederByIdFailure, getOrederByIdRequest, getOrederByIdSuccess } from "./order.action";

export interface OrderState {
    order: any | null,
    orders: any[],
    loading: boolean,
    error: any,
}
const initialState: OrderState = {
    order: null,
    orders: [],
    loading: false,
    error: null,
};

export const orderReducer = createReducer(
    initialState,
    on(createOrderRequest, getOrederByIdRequest, getOrderHistoryRequest, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(createOrderSuccess, (state, {order}) => ({
        ...state,
        loading: false,
        order,
    })),
    on(getOrederByIdSuccess, (state, {orderId}) => ({
        ...state,
        loading: false,
        orderId,
    })),
    on(getOrderHistorySuccess, (state, {orders}) => ({
        ...state,
        loading: false,
        orders,
    })),
    on(createOrderFailure, getOrederByIdFailure, getOrderHistoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    })),
)