import { createReducer, on } from '@ngrx/store';
import { findProductsByCategoryFailure, findProductsByCategorySuccess, findProductsByIdFailure, findProductsByIdSuccess } from './product.action';


const initialState= {
    products: [],
    product:null,
    loading: false,
    error: null,
};

export const productReducer = createReducer(
    initialState,
    on(findProductsByCategorySuccess, (state, { payload }) => ({
        ...state,
        products: payload,
        content: payload.content,
        loading: false,
      })),
      on(findProductsByIdSuccess, (state, { payload }) => ({
        ...state,
        product: payload, 
        loading: false,
      })),

    on(findProductsByCategoryFailure, findProductsByIdFailure, (state, {error}) => ({
        ...state,
        error: error,
        loading: false,
    })),
    
);