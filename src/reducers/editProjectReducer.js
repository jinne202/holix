export const editProjectReducerInitialState = {
    category : [],
    mapList : [],
    isLoadingConfig: true,
    posting: Object,
   
}

export const LOAD_CATEGORY_REQUEST = 'LOAD_CATEGORY_REQUEST';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';
export const LOAD_POSTING_REQUEST = 'LOAD_POSTING_REQUEST';
export const LOAD_POSTING_SUCCESS = 'LOAD_POSTING_SUCCESS';
export const LOAD_POSTING_FAILURE = 'LOAD_POSTING_FAILURE';
export const LOAD_MAP_REQUEST = 'LOAD_MAP_REQUEST';
export const LOAD_MAP_SUCCESS = 'LOAD_MAP_SUCCESS';
export const LOAD_MAP_FAILURE = 'LOAD_MAP_FAILURE';


export const loadPostRequestAction = () => {
    
}

export const editProjectReducer = (state = editProjectReducerInitialState, action) =>
{
    switch (action.type) {
        case LOAD_CATEGORY_REQUEST : {
            console.log(action.data);
            return {
                ...state,
                isLoadingConfig : true
            }
        }
        case LOAD_CATEGORY_SUCCESS : {
            return {
                ...state,
                isLoadingConfig : false,
                category : action.data,
            }
        }
        case LOAD_CATEGORY_FAILURE : {
            return {
                ...state,
                isLoadingConfig : false,
            }
        }
        case LOAD_POSTING_REQUEST: {
            return {
                ...state,
                posting : null,
            }
        }
        case LOAD_POSTING_SUCCESS: {
            return {
                ...state,
                posting: action.data,
            }
        }
        case LOAD_POSTING_FAILURE: {
            return {
                ...state,
                posting: null,
            }
        }
        case LOAD_MAP_REQUEST : {
            console.log(action.data);
            return {
                ...state,
            }
        }
        case LOAD_MAP_SUCCESS : {
            return {
                ...state,
                mapList : action.data,
            }
        }
        case LOAD_MAP_FAILURE : {
            return {
                ...state,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}