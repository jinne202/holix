export const deliveryInitialState = {
    deliveryList : [],
    isLoading : false,
}

export const LOAD_DELIVERYS_REQUEST = 'LOAD_DELIVERYS_REQUEST';
export const LOAD_DELIVERYS_SUCCESS = 'LOAD_DELIVERYS_SUCCESS';
export const LOAD_DELIVERYS_FAILURE = 'LOAD_DELIVERYS_FAILURE';

export const loadDeliveryRequestAction = () => {
    
}

export const deliveryReducer = (state = deliveryInitialState, action) =>
{
    switch (action.type) {
        case LOAD_DELIVERYS_REQUEST : {
            return {
                ...state,
                isLoading : true
            }
        }
        case LOAD_DELIVERYS_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                productList : action.data,
            }
        }
        case LOAD_DELIVERYS_FAILURE : {
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