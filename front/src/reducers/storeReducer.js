export const storeInitialState = {
    orderList : [],
    isLoaded : false,
    order:null,
    productList : [],
    product:null,
    sellerList : null
}

export const LOAD_ORDERS_REQUEST = 'LOAD_ORDERS_REQUEST';
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_ORDERS_FAILURE = 'LOAD_ORDERS_FAILURE';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';
export const LOAD_ORDER_REQUEST = 'LOAD_ORDER_REQUEST';
export const LOAD_ORDER_SUCCESS = 'LOAD_ORDER_SUCCESS';
export const LOAD_ORDER_FAILURE = 'LOAD_ORDER_FAILURE';


export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';
export const LOAD_PRODUCT_REQUEST = 'LOAD_PRODUCT_REQUEST';
export const LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT_SUCCESS';
export const LOAD_PRODUCT_FAILURE = 'LOAD_PRODUCT_FAILURE';


export const REGISTER_SELLER_REQUEST = 'REGISTER_SELLER_REQUEST';
export const REGISTER_SELLER_SUCCESS = 'REGISTER_SELLER_SUCCESS';
export const REGISTER_SELLER_FAILURE = 'REGISTER_SELLER_FAILURE';
export const LOAD_SELLER_REQUEST = 'LOAD_SELLER_REQUEST';
export const LOAD_SELLER_SUCCESS = 'LOAD_SELLER_SUCCESS';
export const LOAD_SELLER_FAILURE = 'LOAD_SELLER_FAILURE';

export const WRITE_REVIEW_REQUEST = 'WRITE_REVIEW_REQUEST';
export const WRITE_REVIEW_SUCCESS = 'WRITE_REVIEW_SUCCESS';
export const WRITE_REVIEW_FAILURE = 'WRITE_REVIEW_FAILURE';
export const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST';
export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const DELETE_REVIEW_FAILURE = 'DELETE_REVIEW_FAILURE';

export const WRITE_QNA_REQUEST = 'WRITE_QNA_REQUEST';
export const WRITE_QNA_SUCCESS = 'WRITE_QNA_SUCCESS';
export const WRITE_QNA_FAILURE = 'WRITE_QNA_FAILURE';
export const DELETE_QNA_REQUEST = 'DELETE_QNA_REQUEST';
export const DELETE_QNA_SUCCESS = 'DELETE_QNA_SUCCESS';
export const DELETE_QNA_FAILURE = 'DELETE_QNA_FAILURE';

export const storeReducer = (state = storeInitialState, action) =>
{
    console.log(action.type);
    switch (action.type) {
        case LOAD_ORDERS_REQUEST : {
            return {
                ...state,
                isLoaded : false
            }
        }
        case LOAD_ORDERS_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                orderList : action.data,
            }
        }
        case LOAD_ORDERS_FAILURE : {
            return {
                ...state,
                isLoaded : false,
            }
        }
        case ORDER_REQUEST : {
            return {
                ...state,
            }
        }
        case ORDER_SUCCESS : {
            return {
                ...state,
                order : action.data,
            }
        }
        case ORDER_FAILURE : {
            return {
                ...state,
            }
        }
        case LOAD_ORDER_REQUEST : {
            return {
                ...state,
            }
        }
        case LOAD_ORDER_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                order : action.data,
            }
        }
        case LOAD_ORDER_FAILURE : {
            return {
                ...state,
                isLoaded : false,
            }
        }
        case WRITE_REVIEW_REQUEST : {
            return {
                ...state,
            }
        }
        case WRITE_REVIEW_SUCCESS : {
            return {
                ...state,
            }
        }
        case WRITE_REVIEW_FAILURE : {
            return {
                ...state,
            }
        }
        case LOAD_PRODUCTS_REQUEST : {
            return {
                ...state,
                isLoaded : false
            }
        }
        case LOAD_PRODUCTS_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                productList : action.data,
            }
        }
        case LOAD_PRODUCTS_FAILURE : {
            return {
                ...state,
                isLoaded : false,
            }
        }
        case LOAD_PRODUCT_REQUEST : {
            return {
                ...state,
                isLoaded : false,
                product : null
            }
        }
        case LOAD_PRODUCT_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                product : action.data,
            }
        }
        case LOAD_PRODUCT_FAILURE : {
            return {
                ...state,
                isLoaded : false,
            }
        }
        case REGISTER_SELLER_SUCCESS : {
            return {
                ...state,
                sellerList : action.data
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}