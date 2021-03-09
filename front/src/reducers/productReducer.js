export const productInitialState = {
    productList : [],
    isLoading : false,
    product:null
}

export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';
export const LOAD_PRODUCT_REQUEST = 'LOAD_PRODUCT_REQUEST';
export const LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT_SUCCESS';
export const LOAD_PRODUCT_FAILURE = 'LOAD_PRODUCT_FAILURE';

export const loadProductRequestAction = () => {
    
}

export const productReducer = (state = productInitialState, action) =>
{
    switch (action.type) {
        case LOAD_PRODUCTS_REQUEST : {
            return {
                ...state,
                isLoading : true
            }
        }
        case LOAD_PRODUCTS_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                productList : action.data,
            }
        }
        case LOAD_PRODUCTS_FAILURE : {
            return {
                ...state,
                isLoading : false,
            }
        }
        case LOAD_PRODUCT_REQUEST : {
            return {
                ...state,
                isLoading : true
            }
        }
        case LOAD_PRODUCT_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                product : action.data,
            }
        }
        case LOAD_PRODUCT_FAILURE : {
            return {
                ...state,
                isLoading : false,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}